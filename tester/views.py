from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import speedtest
# Create your views here.

class InternetSpeedTest(APIView):
    def get(self, request):
        try:
            speed = speedtest.Speedtest()
            # speed.get_best_server()

            download = speed.download() / 1_000_000

            upload = speed.upload() / 1_000_000

            ping = speed.results.ping

            return Response({
                "Download": f"{download:.2f}",
                "Upload": f"{upload:.2f}",
                "Ping": f"{ping:.2f}"
            }, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
