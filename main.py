import speedtest

def perform_speed_test():
    """Performs an internet speed test and prints the results."""
    try:
        st = speedtest.Speedtest()
        print("Finding best server...")
        st.get_best_server()  # Finds the closest server for accurate results

        print("Testing download speed...")
        download_speed = st.download() / 1_000_000  # Convert from bps to Mbps

        print("Testing upload speed...")
        upload_speed = st.upload() / 1_000_000  # Convert from bps to Mbps

        ping = st.results.ping  # Ping in milliseconds

        print(f"Download Speed: {download_speed:.2f} Mbps")
        print(f"Upload Speed: {upload_speed:.2f} Mbps")
        print(f"Ping: {ping:.2f} ms")

    except speedtest.SpeedtestException as e:
        print(f"An error occurred during the speed test: {e}")

if __name__ == "__main__":
    perform_speed_test()