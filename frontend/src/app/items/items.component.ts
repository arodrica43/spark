import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '' };
  editingItem: Item | null = null;
  loading = false;
  error: string | null = null;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = null;
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load items';
        this.loading = false;
        console.error('Error loading items:', err);
      }
    });
  }

  createItem(): void {
    if (!this.newItem.name) {
      return;
    }

    this.loading = true;
    this.itemService.createItem(this.newItem).subscribe({
      next: (item) => {
        this.items.push(item);
        this.newItem = { name: '', description: '' };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create item';
        this.loading = false;
        console.error('Error creating item:', err);
      }
    });
  }

  editItem(item: Item): void {
    this.editingItem = { ...item };
  }

  updateItem(): void {
    if (!this.editingItem || !this.editingItem.id) {
      return;
    }

    this.loading = true;
    this.itemService.updateItem(this.editingItem.id, this.editingItem).subscribe({
      next: (updatedItem) => {
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        this.editingItem = null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update item';
        this.loading = false;
        console.error('Error updating item:', err);
      }
    });
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(id: number | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this item?')) {
      return;
    }

    this.loading = true;
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete item';
        this.loading = false;
        console.error('Error deleting item:', err);
      }
    });
  }
}
