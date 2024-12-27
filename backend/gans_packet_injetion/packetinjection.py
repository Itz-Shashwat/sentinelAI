from scapy.all import sniff, send, IP, TCP, UDP, show_interfaces
import pandas as pd
import random
import time
import logging

logging.basicConfig(
    filename="decoy_logs.txt", 
    level=logging.INFO, 
    format="%(asctime)s - %(message)s"
)

def list_interfaces():
    print("Available network interfaces:")
    show_interfaces()

def load_decoy_config(file_path):
    try:
        config = pd.read_csv(file_path)
        
        config.columns = ["Source IP", "Protocol", "Length", "Destination IP"]  # Fix column names
        
        required_fields = ["Source IP", "Protocol", "Length", "Destination IP"]
        if not all(field in config.columns for field in required_fields):
            logging.error(f"CSV missing required fields: {required_fields}")
            return None
        print(f"Decoy config loaded successfully: {len(config)} entries.")
        return config.to_dict("records")
    except Exception as e:
        logging.error(f"Error loading CSV file: {e}")
        print(f"Error loading config: {e}")
        return None

def create_decoy_packet(config):
    try:
        packet = IP(src=config["Source IP"], dst=config["Destination IP"])
        if config["Protocol"] == "TCP":
            packet /= TCP(dport=random.randint(1024, 65535), flags="S") / ("X" * int(config["Length"]))
        elif config["Protocol"] == "UDP":
            packet /= UDP(dport=random.randint(1024, 65535)) / ("X" * int(config["Length"]))
        print(f"Created decoy packet: {packet.summary()}")
        return packet
    except Exception as e:
        logging.error(f"Error creating decoy packet: {e}")
        print(f"Error creating decoy packet: {e}")
        return None

def send_decoy_packets(packet, decoy_configs, decoy_count=5):
    logging.info(f"Original Packet Observed: {packet.summary()}")
    print(f"Original Packet Observed: {packet.summary()}")

    for _ in range(decoy_count):
        decoy_config = random.choice(decoy_configs)
        decoy_packet = create_decoy_packet(decoy_config)
        if decoy_packet:
            try:
                send(decoy_packet, verbose=False)
                logging.info(f"Sent Decoy Packet: {decoy_packet.summary()}")
                print(f"Sent Decoy Packet: {decoy_packet.summary()}")
                with open("sent_decoys.csv", "a") as f:
                    f.write(f"{decoy_packet.src},{decoy_packet.dst},{decoy_config['Protocol']},{len(decoy_packet)}\n")
            except Exception as e:
                logging.error(f"Error sending decoy packet: {e}")
                print(f"Error sending decoy packet: {e}")
        time.sleep(random.uniform(0.1, 0.5))  

def packet_handler(packet):
    print("Packet handler triggered.")  
    if IP in packet:
        print("IP packet detected.")  
        decoy_configs = load_decoy_config(r"C:\Users\HP\Downloads\synthetic_data.csv")
        if decoy_configs:
            send_decoy_packets(packet, decoy_configs)

def start_sniffing(interface="eth0"):
    logging.info(f"Listening for outgoing packets on {interface}...")
    print(f"Listening for outgoing packets on {interface}...")
    try:
        sniff(iface=interface, filter="ip", prn=packet_handler)
    except Exception as e:
        logging.error(f"Error during sniffing: {e}")
        print(f"Error during sniffing: {e}")

if __name__ == "__main__":
    list_interfaces()
    
    start_sniffing(interface="Wi-Fi")  
