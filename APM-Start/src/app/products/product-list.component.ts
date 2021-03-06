import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    btnName: string = 'Show Image';
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService){
        
    }

    ngOnInit(): void {
        this.getProducts();        
    }

    getProducts(): void{
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error 
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(listFilter: string): IProduct[] {
        listFilter = listFilter.toLocaleLowerCase();
        return this.products.filter((product) =>
            product.productName.toLocaleLowerCase().indexOf(listFilter) != -1
        );
    }

    onRatingClicked(message: string): void{
        console.log('Received message from nested component '+message);
    }
}