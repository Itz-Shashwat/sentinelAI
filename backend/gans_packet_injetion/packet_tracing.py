from scapy.all import sniff, IP, get_if_list
import pandas as pd

decoy_log = []

def load_decoy_config(file_path):
    try:
        config = pd.read_csv(file_path)
        config.columns = ["Source IP", "Protocol", "Length", "Destination IP"]  # Correct column names
        required_fields = ["Source IP", "Protocol", "Length", "Destination IP"]
        if not all(field in config.columns for field in required_fields):
            print(f"CSV missing required fields: {required_fields}")
            return None
        print(f"Decoy config loaded: {len(config)} entries.")
        return config.to_dict("records")
    except Exception as e:
        print(f"Error loading CSV file: {e}")
        return None

def list_interfaces():
    print("Available network interfaces:")
    interfaces = get_if_list()
    for interface in interfaces:
        print(interface)

def verify_decoy_packets(packet):
    if IP in packet:
        src = packet[IP].src
        dst = packet[IP].dst
        protocol = type(packet.payload).__name__

        print(f"Captured Packet: {packet.summary()}")
        decoy_configs = load_decoy_config(r"C:\Users\HP\Downloads\synthetic_data.csv")
        if decoy_configs:
            for decoy in decoy_configs:
                if decoy["Source IP"] == src and decoy["Destination IP"] == dst and decoy["Protocol"].lower() == protocol.lower():
                    print(f"Matched Synthetic Decoy Packet: {packet.summary()}")
                    decoy_log.append({"Source": src, "Destination": dst, "Protocol": protocol})

if __name__ == "__main__":
    print("Monitoring decoy packet flow...")
    
    list_interfaces()
    
    sniff(iface="Wi-Fi", filter="ip", prn=verify_decoy_packets)
