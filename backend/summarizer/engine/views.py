from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import *
from .summ_models import *
from sklearn.cluster import AgglomerativeClustering
# Create your views here.


def return_summary(articles, threshold):
    """
    Parameters:
    ------------------------------------------------------------------------
        articles (list): contains articles to be summarized
                         entered by the user and sent to the backend
                         by the request

        threshold (float): value for the distance threshold which controls
                           the number of clusters and hence chunk size
    ------------------------------------------------------------------------
    Returns:

        final_summary (string): the final summary

    """
    sentences, words = make_data(articles)
    embeddings = sentence2embedding(sentences, EMBEDDING_MODEL)

    CUSTOM_CLEMB_KWARGS = {
		'clustering_algorithm': AgglomerativeClustering(
			n_clusters=None,
			distance_threshold=threshold
		),
		'embeddings': embeddings,
		'sentences': sentences,
		'words': words,
		'num_articles': len(articles)
	}

    clemb = ClusterSentenceEmbeddings(**CUSTOM_CLEMB_KWARGS)
    sentence_clusters = clemb.get_sentence_clusters()

    final_summary = ""

    for idx, cluster in enumerate(sentence_clusters):
        summary = bart_summarize(cluster, SUMMARIZATION_MODEL, SUMMARIZATION_TOKENIZER)
        final_summary += summary + " "
    
    final_summary = final_summary[:-1]
    final_summary += "."

    return final_summary

class ProvideSummaryView(APIView):
    def post(self, request, format=None):
        text_list = request.data.get('text_list')
        #print(textList )
        distance = request.data.get('distance')
        distance = int(distance)
        num_aricles = request.data.get('num_articles')

        main_txt = return_summary(text_list,distance)

        return Response({'file':main_txt},status=status.HTTP_200_OK)
    