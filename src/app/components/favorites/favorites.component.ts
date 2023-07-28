import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IWishlistItem } from 'src/app/models/IWeatherItem.models';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  wishlistEmpty: boolean = true;
  favoritesData: MatTableDataSource<IWishlistItem> = new MatTableDataSource<IWishlistItem>([]);
  tableHeaders: IWishlistItem = { id: "Id", name: "Name City", currentWeather: "Current Weather", tempWeather: "Temperature (°C)" };
  public displayedColumns: any[] = [...Object.keys(this.tableHeaders), 'actions'];

  constructor(private wishlistService: WishlistService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshTableData();
  }

  refreshTableData(): void {
    this.wishlistService.getAllItems().subscribe((data: IWishlistItem[]) => {
      if (data.length > 0) {
        this.wishlistEmpty = false;
        this.favoritesData.data = data;
      } else {
        this.wishlistEmpty = true;
      }
    });
  }

  deleteRow(element: IWishlistItem): void {
    this.wishlistService.deleteItem(element.id)
    this.refreshTableData();
  }

  navigateToMainScreen(cityName: string): void {
    // this.router.navigate(['./'], { relativeTo: this.route, queryParams: { cityName: cityName } });
    this.router.navigate(['/main-screen', cityName]);
  }
}
