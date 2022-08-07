from django.contrib import admin
from .models import Order, Shirt


def toggle_status(modeladmin, request, queryset):
    queryset.update(orderST='True')


toggle_status.short_description = 'Mark orders as fulfilled'


class StockListFilter(admin.SimpleListFilter):
    title = ('Stock')
    parameter_name = 'stock'

    def lookups(self, request, model_admin):
        return (
            ('low', ('Low Stock')),
            ('stocked', ('In Stock'))
        )

    def queryset(self, request, queryset):
        if self.value() == 'low':
            return queryset.filter(stock__lte=5)
        if self.value() == 'stocked':
            return queryset.filter(stock__gte=5)


# Register your models here.
class ShirtAdmin(admin.ModelAdmin):
    list_display = ('id', 'stock', 'name', 'sold', 'price')
    list_filter = (StockListFilter,)
    search_fields = ['name']


class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'orderP',  'id', 'orderST')
    list_filter = ['orderST']
    actions = [toggle_status]
    search_fields = ['name']


admin.site.register(Order, OrderAdmin)
admin.site.register(Shirt, ShirtAdmin)
