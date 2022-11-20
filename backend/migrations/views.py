import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Articles
from django.db.models import Sum


def index(request):
    return render(request, 'index.html')


# @csrf_exempt
# def addResource(request):
#     if request.method != 'POST':
#         return HttpResponse(status=400)
#     data = json.loads(request.body)
#     newResource = data['link']
#     # add newResource to database
#     r = articles(link=newResource)
#     try:
#         r.save()
#     except IntegrityError:
#         return HttpResponse('Url already in the database.', status=400)
#     return HttpResponse(status=200)


def getArticles(request):
    if request.method != 'GET':
        return HttpResponse(status=400)
    # avResources = list()
    for entry in Articles.objects.all():
        print(vars(entry))
    return HttpResponse(status=200)
    # return JsonResponse({avResources})


# @csrf_exempt
# def deleteResources(request):
#     if request.method != 'DELETE':
#         return HttpResponse(status=400)
#     data = json.loads(request.body)
#     toBeDeleted = data['urls']
#     if toBeDeleted == 'all':
#         articles.objects.all().delete()
#     # assuming toBeDeleted is a list
#     for url in toBeDeleted:
#         # print(f"url to delete: {url}")
#         # print(availableResources.objects.filter(link=url))
#         articles.objects.filter(link=url).delete()
#     return HttpResponse(status=202)

@csrf_exempt
def addFakeVote(request):
    if request.method != 'POST':
        return HttpResponse(status=400)
    data = json.loads(request.body)
    url = data['url']
    isFake = data['isFake']
    isFake = 1 if isFake.lower() in ['1', 'yes', 'true'] else 0
    entry = Articles.objects.filter(url=url)[0]
    if entry:
        entry.fake_votes += isFake
        entry.non_fake_votes += (1 - isFake)
    else:
        entry = Articles(url=url, resource=data['resource'], datePublished=data['datePublished'].replace(":", "-"),
                         fake_votes=isFake,
                         non_fake_votes=1 - isFake)
    entry.save()
    fake_likelihood = ((entry.fake_votes + 1) * 100) / (entry.fake_votes + entry.non_fake_votes + 2)
    return JsonResponse({"fakeLikelihood": fake_likelihood}, status=200)


def resource_fake_likelihood(resource: str):
    votes = Articles.objects.filter(resource=resource).aggregate(fake=Sum('fake_votes') or 0,
                                                                 non_fake=Sum('non_fake_votes') or 0)
    return ((votes.fake + 1) * 100) / (votes.fake + votes.non_fake + 2)


def article_fake_likelihood(url: str):
    article_weight = 0.5
    resource_weight = 0.5
    votes = Articles.objects.filter(url=url)[0]
    resource = votes.resource
    article_ratio = 0.5
    if votes:
        article_ratio = ((votes.fake_votes + 1) * 100) / (votes.fake_votes + votes.non_fake_votes + 2)
    return article_ratio * article_weight + resource_fake_likelihood(resource) * resource_weight


def get_articles_fake_likelihood(request):
    if request.method != 'POST':
        return HttpResponse(status=400)
    data = json.loads(request.body)
    articles = data['articles']
    # assuming articles is a list
    fake_likelihoods = dict((url, article_fake_likelihood(url)) for url in articles)
    return JsonResponse({"fakeLikelihoods": fake_likelihoods}, status=200)
