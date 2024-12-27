import threading
import tkinter as tk
from tkinter import messagebox
from scapy.all import sniff, IP, TCP, UDP, send
import pandas as pd
from tkinter import simpledialog, filedialog  

class DecoyInjectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Sentinel AI")
        self.root.geometry("600x600")

        self.file_path = ""
        self.decoy_data = None
        self.total_packets_injected = 0
        self.input_prompt_shown = False 

        # UI Components
        self.title_label = tk.Label(root, text="Network Traffic Decoy Injector", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=20)

        self.load_csv_btn = tk.Button(root, text="Load CSV File", width=20, command=self.load_csv_file)
        self.load_csv_btn.pack(pady=10)

        self.start_inject_btn = tk.Button(root, text="Start Decoy Injection", width=20, command=self.start_sniffing)
        self.start_inject_btn.pack(pady=20)

        self.status_label = tk.Label(root, text="Status: Waiting for action...", fg="blue", font=("Arial", 10))
        self.status_label.pack(pady=10)

        self.output_text = tk.Text(root, height=15, width=70, wrap=tk.WORD, state=tk.DISABLED)
        self.output_text.pack(pady=10)

    def load_csv_file(self):
        try:
            file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
            if not file_path:
                self.write_output("Load canceled: No file selected.\n")
                return

            self.decoy_data = pd.read_csv(file_path)
            required_columns = ['Source IP', 'Destination IP', 'Protocol', 'Length']
            if not all(col in self.decoy_data.columns for col in required_columns):
                raise ValueError(f"CSV file is missing required columns: {required_columns}")

            self.file_path = file_path
            self.status_label.config(text="CSV Loaded Successfully!", fg="green")
            self.write_output(f"Loaded CSV from {self.file_path}\n")
        except (ValueError, FileNotFoundError) as e:
            self.write_output(f"Error loading CSV: {e}\n")
            self.status_label.config(text="Error loading CSV!", fg="red")

    def inject_decoy_packet(self, src, dst, protocol, length):
        try:
            # Create packet 
            if protocol.lower() == "tcp":
                decoy_packet = IP(src=src, dst=dst)/TCP()/("X" * int(length))
            elif protocol.lower() == "udp":
                decoy_packet = IP(src=src, dst=dst)/UDP()/("X" * int(length))
            else:
                decoy_packet = IP(src=src, dst=dst)/("X" * int(length))

            send(decoy_packet, verbose=False)
            self.total_packets_injected += 1
            self.write_output(f"Injected Decoy Packet: {src} -> {dst} (Protocol: {protocol}, Length: {length})\n")
        except Exception as e:
            self.write_output(f"Error injecting packet: {e}\n")

    def verify_real_packet(self, packet):
        if IP in packet:
            if not self.input_prompt_shown:
                self.input_prompt_shown = True
                self.root.after(0, self.ask_for_input)

    def ask_for_input(self):
        num_packets = simpledialog.askinteger("Input", "Enter the total number of packets to inject per real packet:", minvalue=1)

        if self.decoy_data is None or self.decoy_data.empty:
            self.write_output("Decoy data is not available. Please load the CSV first.\n")
            return

        # Run packet injection
        inject_thread = threading.Thread(target=self.inject_packets, args=(num_packets,))
        inject_thread.daemon = True
        inject_thread.start()

    def inject_packets(self, num_packets):
        for _ in range(num_packets):
            for _, row in self.decoy_data.iterrows():
                src = row['Source IP']
                dst = row['Destination IP']
                protocol = row['Protocol']
                length = row['Length']
                self.inject_decoy_packet(src, dst, protocol, length)

    def start_sniffing(self):
        self.status_label.config(text="Sniffing and injecting decoy packets...", fg="orange")
        sniff_thread = threading.Thread(target=self.sniff_thread)
        sniff_thread.daemon = True
        sniff_thread.start()

    def sniff_thread(self):
        sniff(iface="Wi-Fi", filter="ip", prn=self.verify_real_packet, store=False)

    def write_output(self, text):
        self.output_text.config(state=tk.NORMAL)
        self.output_text.insert(tk.END, text)
        self.output_text.yview(tk.END)
        self.output_text.config(state=tk.DISABLED)

if __name__ == "__main__":
    root = tk.Tk()
    app = DecoyInjectionApp(root)
    root.mainloop()
