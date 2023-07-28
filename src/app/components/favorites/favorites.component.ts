import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IWishlistItem } from 'src/app/models/IWeatherItem.models';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoritesData: MatTableDataSource<IWishlistItem> = new MatTableDataSource<IWishlistItem>([]);
  tableHeaders: IWishlistItem = { id: "Id", name: "Name City", currentWeather: "Current Weather", tempWeather: "Temperature (°C)" };
  public displayedColumns: any[] = [...Object.keys(this.tableHeaders), 'actions'];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.refreshTableData();
  }

  refreshTableData(): void {
    this.wishlistService.getAllItems().subscribe((data: IWishlistItem[]) => {
      this.favoritesData.data = data;
    });
  }

  deleteRow(element: IWishlistItem): void {
    this.wishlistService.deleteItem(element.id)
    this.refreshTableData();
  }
}
