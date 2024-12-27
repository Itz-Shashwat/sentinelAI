import time
import threading
import tkinter as tk
from tkinter import filedialog, messagebox
from scapy.all import sniff, IP, TCP, UDP, send, get_if_list
import pandas as pd

class DecoyInjectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Sentinel AI")
        self.root.geometry("600x400")
        
        # New Attributes for Traffic Control
        self.packet_rate = 1  # Inject 1 packet per second by default
        self.batch_size = 5  # Number of packets to inject in one batch (example value)
        self.total_packets_injected = 0  # Total number of packets injected
        self.packets_per_second = 0  # Packets injected per second (calculated in real-time)
        
        self.file_path = ""
        self.title_label = tk.Label(root, text="Network Traffic Decoy Injector", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=20)

        self.csv_frame = tk.Frame(root)
        self.csv_frame.pack(pady=10)

        self.load_btn = tk.Button(self.csv_frame, text="Load CSV", width=20, command=self.load_csv)
        self.load_btn.pack(side=tk.LEFT, padx=10)

        self.csv_path_label = tk.Label(self.csv_frame, text="No file selected", width=40)
        self.csv_path_label.pack(side=tk.LEFT)

        self.start_inject_btn = tk.Button(root, text="Start Decoy Injection", width=20, command=self.start_sniffing)
        self.start_inject_btn.pack(pady=20)

        # Controls for Traffic Volume Control
        self.packet_rate_label = tk.Label(root, text="Rate Limiting (Packets per second):")
        self.packet_rate_label.pack(pady=5)

        self.packet_rate_entry = tk.Entry(root)
        self.packet_rate_entry.insert(tk.END, str(self.packet_rate))
        self.packet_rate_entry.pack(pady=5)

        self.batch_size_label = tk.Label(root, text="Batch Size (Packets per batch):")
        self.batch_size_label.pack(pady=5)

        self.batch_size_entry = tk.Entry(root)
        self.batch_size_entry.insert(tk.END, str(self.batch_size))
        self.batch_size_entry.pack(pady=5)

        self.status_label = tk.Label(root, text="Status: Waiting for action...", fg="blue", font=("Arial", 10))
        self.status_label.pack(pady=10)

        self.output_text = tk.Text(root, height=10, width=70, wrap=tk.WORD, state=tk.DISABLED)
        self.output_text.pack(pady=10)

    def load_csv(self):
        self.file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
        if self.file_path:
            self.csv_path_label.config(text=self.file_path)
            self.status_label.config(text="CSV Loaded Successfully!", fg="green")
            self.write_output(f"Loaded CSV file: {self.file_path}\n")

    def load_decoy_config(self):
        try:
            config = pd.read_csv(self.file_path)
            config.columns = ["Source IP", "Protocol", "Length", "Destination IP"]
            required_fields = ["Source IP", "Protocol", "Length", "Destination IP"]
            if not all(field in config.columns for field in required_fields):
                self.write_output(f"CSV missing required fields: {required_fields}\n")
                return None
            self.write_output(f"Decoy config loaded: {len(config)} entries.\n")
            return config.to_dict("records")
        except Exception as e:
            self.write_output(f"Error loading CSV file: {e}\n")
            return None

    def list_interfaces(self):
        self.write_output("Available network interfaces:\n")
        interfaces = get_if_list()
        for interface in interfaces:
            self.write_output(f"{interface}\n")

    def inject_decoy_packet(self, src, dst, protocol):
        # Batch Injection Logic
        decoy_configs = self.load_decoy_config()
        if decoy_configs:
            for decoy in decoy_configs:
                if decoy["Source IP"] == src and decoy["Destination IP"] == dst and decoy["Protocol"].lower() == protocol.lower():
                    self.write_output(f"Injecting Decoy Packet: Source: {src}, Destination: {dst}, Protocol: {protocol}\n")
                    
                    # Create the decoy packet
                    if protocol.lower() == "tcp":
                        decoy_packet = IP(src=src, dst=dst)/TCP()
                    elif protocol.lower() == "udp":
                        decoy_packet = IP(src=src, dst=dst)/UDP()
                    else:
                        decoy_packet = IP(src=src, dst=dst)

                    # Send the decoy packet
                    send(decoy_packet)

                    # Provide feedback in GUI about injection
                    self.write_output(f"Decoy Packet Sent: {src} -> {dst} (Protocol: {protocol})\n")
                    
                    # Log decoy injection for further tracking
                    decoy_log.append({"Source": src, "Destination": dst, "Protocol": protocol})

                    # Update the counter of total packets injected
                    self.total_packets_injected += 1
                    self.update_packet_statistics()

                    # Show success message in status label
                    self.status_label.config(text=f"Decoy Packet Sent to {dst}!", fg="green")

    def verify_decoy_packets(self, packet):
        if IP in packet:
            src = packet[IP].src
            dst = packet[IP].dst
            protocol = type(packet.payload).__name__
            self.write_output(f"Captured Packet: {packet.summary()}\n")
            self.inject_decoy_packet(src, dst, protocol)

    def start_sniffing(self):
        if not self.file_path:
            messagebox.showerror("Error", "Please load a CSV file first.")
            return

        # Retrieve user-defined traffic controls
        try:
            self.packet_rate = int(self.packet_rate_entry.get())
            self.batch_size = int(self.batch_size_entry.get())
        except ValueError:
            self.write_output("Error: Invalid rate or batch size.\n")
            return

        self.status_label.config(text="Sniffing and injecting decoy packets...", fg="orange")
        self.list_interfaces()

        sniff_thread = threading.Thread(target=self.sniff_thread)
        sniff_thread.daemon = True  # Run the sniffing process in the background
        sniff_thread.start()

    def sniff_thread(self):
        while True:
            sniff(iface="Wi-Fi", filter="ip", prn=self.verify_decoy_packets)

    def update_packet_statistics(self):
        # Update traffic monitoring stats
        self.packets_per_second += 1
        self.write_output(f"Total Packets Injected: {self.total_packets_injected}\n")
        self.write_output(f"Packets Injected in Last Second: {self.packets_per_second}\n")
        self.packets_per_second = 0  # Reset counter every second

    def write_output(self, text):
        self.output_text.config(state=tk.NORMAL)
        self.output_text.insert(tk.END, text)
        self.output_text.yview(tk.END)  # Scroll to the end
        self.output_text.config(state=tk.DISABLED)

if __name__ == "__main__":
    root = tk.Tk()
    app = DecoyInjectionApp(root)
    root.mainloop()
