import tkinter as tk
from tkinter import filedialog, messagebox
from scapy.all import sniff, IP, TCP, UDP, send, get_if_list
import pandas as pd
import threading  

decoy_log = []

class DecoyInjectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Decoy Traffic Injection")
        self.root.geometry("600x400")


        self.file_path = ""

        self.title_label = tk.Label(root, text="Network Traffic Decoy Generator", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=20)

        self.csv_frame = tk.Frame(root)
        self.csv_frame.pack(pady=10)

        self.load_btn = tk.Button(self.csv_frame, text="Load CSV", width=20, command=self.load_csv)
        self.load_btn.pack(side=tk.LEFT, padx=10)

        self.csv_path_label = tk.Label(self.csv_frame, text="No file selected", width=40)
        self.csv_path_label.pack(side=tk.LEFT)

        self.start_inject_btn = tk.Button(root, text="Start Decoy Injection", width=20, command=self.start_sniffing)
        self.start_inject_btn.pack(pady=20)

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
        decoy_configs = self.load_decoy_config()
        if decoy_configs:
            for decoy in decoy_configs:
                if decoy["Source IP"] == src and decoy["Destination IP"] == dst and decoy["Protocol"].lower() == protocol.lower():
                    self.write_output(f"Injecting Decoy Packet: Source: {src}, Destination: {dst}, Protocol: {protocol}\n")
                    if protocol.lower() == "tcp":
                        decoy_packet = IP(src=src, dst=dst)/TCP()
                    elif protocol.lower() == "udp":
                        decoy_packet = IP(src=src, dst=dst)/UDP()
                    else:
                        decoy_packet = IP(src=src, dst=dst)
                    send(decoy_packet)
                    decoy_log.append({"Source": src, "Destination": dst, "Protocol": protocol})

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
        self.status_label.config(text="Sniffing and injecting decoy packets...", fg="orange")
        self.list_interfaces()

        sniff_thread = threading.Thread(target=self.sniff_thread)
        sniff_thread.daemon = True 
        sniff_thread.start()

    def sniff_thread(self):
        sniff(iface="Wi-Fi", filter="ip", prn=self.verify_decoy_packets)

    def write_output(self, text):
        self.output_text.config(state=tk.NORMAL)
        self.output_text.insert(tk.END, text)
        self.output_text.yview(tk.END)  # Scroll to the end
        self.output_text.config(state=tk.DISABLED)

if __name__ == "__main__":
    root = tk.Tk()
    app = DecoyInjectionApp(root)
    root.mainloop()
