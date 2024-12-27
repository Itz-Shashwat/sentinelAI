import tkinter as tk
from tkinter import filedialog, messagebox
import pandas as pd

class DecoyInjectionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Network Traffic Decoy Generator")
        self.root.geometry("600x400")
        self.df = None

        # Title Label
        self.title_label = tk.Label(root, text="Network Traffic Decoy Generator", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=20)

        # Frame for CSV loading functionality
        self.csv_frame = tk.Frame(root)
        self.csv_frame.pack(pady=10)

        self.load_btn = tk.Button(self.csv_frame, text="Load CSV", width=20, command=self.load_csv)
        self.load_btn.pack(side=tk.LEFT, padx=10)

        self.csv_path_label = tk.Label(self.csv_frame, text="No file selected", width=40)
        self.csv_path_label.pack(side=tk.LEFT)

        # Frame for configuration selection
        self.config_frame = tk.Frame(root)
        self.config_frame.pack(pady=20)

        self.src_ip_label = tk.Label(self.config_frame, text="Source IP:")
        self.src_ip_label.grid(row=0, column=0, padx=10, pady=5, sticky="e")
        self.src_ip_entry = tk.Entry(self.config_frame)
        self.src_ip_entry.grid(row=0, column=1, padx=10)

        self.dest_ip_label = tk.Label(self.config_frame, text="Destination IP:")
        self.dest_ip_label.grid(row=1, column=0, padx=10, pady=5, sticky="e")
        self.dest_ip_entry = tk.Entry(self.config_frame)
        self.dest_ip_entry.grid(row=1, column=1, padx=10)

        self.protocol_label = tk.Label(self.config_frame, text="Protocol:")
        self.protocol_label.grid(row=2, column=0, padx=10, pady=5, sticky="e")
        self.protocol_entry = tk.Entry(self.config_frame)
        self.protocol_entry.grid(row=2, column=1, padx=10)

        self.length_label = tk.Label(self.config_frame, text="Length:")
        self.length_label.grid(row=3, column=0, padx=10, pady=5, sticky="e")
        self.length_entry = tk.Entry(self.config_frame)
        self.length_entry.grid(row=3, column=1, padx=10)

        # Frame for decoy generation button
        self.generate_frame = tk.Frame(root)
        self.generate_frame.pack(pady=20)

        self.generate_btn = tk.Button(self.generate_frame, text="Generate Decoy Data", width=20, command=self.generate_decoy)
        self.generate_btn.pack()

        self.status_label = tk.Label(root, text="Status: Waiting for action...", fg="blue", font=("Arial", 10))
        self.status_label.pack(pady=10)

    def load_csv(self):
        file_path = filedialog.askopenfilename(filetypes=[("CSV Files", "*.csv")])
        if file_path:
            try:
                self.df = pd.read_csv(file_path)
                self.csv_path_label.config(text=file_path)
                self.status_label.config(text="CSV Loaded Successfully!", fg="green")
            except Exception as e:
                self.status_label.config(text=f"Error loading CSV: {str(e)}", fg="red")

    def generate_decoy(self):
        if self.df is None:
            messagebox.showerror("Error", "No CSV file loaded.")
            return

        # Get user input from the entry fields
        src_ip = self.src_ip_entry.get()
        dest_ip = self.dest_ip_entry.get()
        protocol = self.protocol_entry.get()
        length = self.length_entry.get()

        if not src_ip or not dest_ip or not protocol or not length:
            messagebox.showerror("Error", "All fields must be filled out.")
            return
        
        try:
            # Assuming that the CSV has columns 'SourceIP', 'DestinationIP', 'Protocol', 'Length'
            selected_data = self.df[
                (self.df['SourceIP'] == src_ip) & 
                (self.df['DestinationIP'] == dest_ip) &
                (self.df['Protocol'] == protocol) &
                (self.df['Length'] == int(length))
            ]

            if selected_data.empty:
                messagebox.showwarning("No Decoys", "No matching decoy traffic found.")
                return

            self.status_label.config(text="Decoy Data Generated", fg="green")

            # Display the generated decoy data or add your logic here to inject it into the system
            print(selected_data)

            # For simplicity, you can display some values to confirm injection:
            messagebox.showinfo("Decoy Data", f"Generated decoy data:\n{selected_data.to_string(index=False)}")

        except Exception as e:
            messagebox.showerror("Error", f"An error occurred while generating decoys: {str(e)}")
            self.status_label.config(text="Error", fg="red")


if __name__ == "__main__":
    root = tk.Tk()
    app = DecoyInjectionApp(root)
    root.mainloop()
