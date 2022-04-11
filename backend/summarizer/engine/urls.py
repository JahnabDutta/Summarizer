from django.urls import path
from .views import ProvideSummaryView
urlpatterns = [
    path('get-summary/', ProvideSummaryView.as_view()),
]