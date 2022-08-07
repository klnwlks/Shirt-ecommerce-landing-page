# from django.shortcuts import render
from rest_framework import viewsets, mixins, filters, pagination, status
from rest_framework.response import Response
from .serializers import OrderSerializer, ShirtSerializer
from .models import Order, Shirt


def calcPrice(dict):
    p = 0
    for i in range(len(dict)):
        p += (dict[i]['shirtP'] * dict[i]['shirtQ'])
    return p


class PostViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    pass


# Create your views here.
class OrderView(PostViewset):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['orderP'] = calcPrice(serializer.validated_data['cart'])
            serializer.create(validated_data=serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShirtView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ShirtSerializer
    queryset = Shirt.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['sold']
    pagination_class = pagination.LimitOffsetPagination
    page_size = 20
