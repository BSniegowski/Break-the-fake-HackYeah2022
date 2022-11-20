from django.db import models
import django
import datetime


class Articles(models.Model):
    url = models.CharField(max_length=2000, unique=True)
    resource = models.CharField(max_length=2000)
    datePublished = models.DateField(default=django.utils.timezone.now)
    fake_votes = models.PositiveBigIntegerField(default=0)
    non_fake_votes = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return [self.url, self.resource, self.datePublished, self.fake_votes, self.non_fake_votes]
