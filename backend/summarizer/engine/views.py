from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ProvideSummaryView(APIView):
    def post(self, request, format=None):
        textList = request.data.get('text_list')
        main_txt = ''
        for text in textList:
            main_txt += text
        # concatenate all files into one
        # return summary
        print(len(main_txt))
        return Response({'file':main_txt},status=status.HTTP_200_OK)
