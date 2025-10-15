import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsComponent } from './items.component';
import { ItemService } from '../services/item.service';
import { of, throwError } from 'rxjs';
import { Item } from '../models/item.model';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemService: jasmine.SpyObj<ItemService>;

  beforeEach(async () => {
    const itemServiceSpy = jasmine.createSpyObj('ItemService', [
      'getItems',
      'createItem',
      'updateItem',
      'deleteItem'
    ]);

    await TestBed.configureTestingModule({
      imports: [ItemsComponent, HttpClientTestingModule],
      providers: [
        { provide: ItemService, useValue: itemServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService) as jasmine.SpyObj<ItemService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    const mockItems: Item[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' }
    ];
    itemService.getItems.and.returnValue(of(mockItems));

    component.ngOnInit();

    expect(itemService.getItems).toHaveBeenCalled();
    expect(component.items.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading items', (done) => {
    itemService.getItems.and.returnValue(throwError(() => new Error('Error')));

    component.loadItems();

    setTimeout(() => {
      expect(component.error).toBe('Failed to load items');
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });

  it('should create a new item', () => {
    const newItem: Item = { name: 'New Item', description: 'New Description' };
    const createdItem: Item = { id: 1, ...newItem };
    itemService.createItem.and.returnValue(of(createdItem));

    component.newItem = newItem;
    component.createItem();

    expect(itemService.createItem).toHaveBeenCalledWith(newItem);
    expect(component.items.length).toBe(1);
    expect(component.items[0]).toEqual(createdItem);
    expect(component.newItem.name).toBe('');
  });

  it('should not create item with empty name', () => {
    component.newItem = { name: '', description: 'Description' };
    component.createItem();

    expect(itemService.createItem).not.toHaveBeenCalled();
  });

  it('should delete an item', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockItems: Item[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' }
    ];
    component.items = [...mockItems];
    itemService.deleteItem.and.returnValue(of(undefined));

    component.deleteItem(1);

    expect(itemService.deleteItem).toHaveBeenCalledWith(1);
    expect(component.items.length).toBe(1);
    expect(component.items[0].id).toBe(2);
  });

  it('should not delete item if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.items = [{ id: 1, name: 'Item 1' }];

    component.deleteItem(1);

    expect(itemService.deleteItem).not.toHaveBeenCalled();
    expect(component.items.length).toBe(1);
  });

  it('should edit an item', () => {
    const item: Item = { id: 1, name: 'Item 1', description: 'Description 1' };
    
    component.editItem(item);
    
    expect(component.editingItem).toEqual(item);
    expect(component.editingItem).not.toBe(item); // Should be a copy
  });

  it('should update an item', () => {
    const originalItem: Item = { id: 1, name: 'Original', description: 'Original Desc' };
    const updatedItem: Item = { id: 1, name: 'Updated', description: 'Updated Desc' };
    const editingData = { id: 1, name: 'Updated', description: 'Updated Desc' };
    component.items = [originalItem];
    component.editingItem = editingData;
    itemService.updateItem.and.returnValue(of(updatedItem));

    component.updateItem();

    expect(itemService.updateItem).toHaveBeenCalledWith(1, editingData);
    expect(component.items[0]).toEqual(updatedItem);
    expect(component.editingItem).toBeNull();
  });

  it('should not update item without id', () => {
    component.editingItem = { name: 'No ID' };
    
    component.updateItem();
    
    expect(itemService.updateItem).not.toHaveBeenCalled();
  });

  it('should cancel edit', () => {
    component.editingItem = { id: 1, name: 'Editing' };
    
    component.cancelEdit();
    
    expect(component.editingItem).toBeNull();
  });

  it('should not delete without id', () => {
    component.deleteItem(undefined);
    
    expect(itemService.deleteItem).not.toHaveBeenCalled();
  });

  it('should handle error when creating item', (done) => {
    const newItem: Item = { name: 'New Item', description: 'New Description' };
    component.newItem = newItem;
    itemService.createItem.and.returnValue(throwError(() => new Error('Error')));

    component.createItem();

    setTimeout(() => {
      expect(component.error).toBe('Failed to create item');
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });

  it('should handle error when updating item', (done) => {
    component.editingItem = { id: 1, name: 'Item' };
    itemService.updateItem.and.returnValue(throwError(() => new Error('Error')));

    component.updateItem();

    setTimeout(() => {
      expect(component.error).toBe('Failed to update item');
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });

  it('should handle error when deleting item', (done) => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.items = [{ id: 1, name: 'Item 1' }];
    itemService.deleteItem.and.returnValue(throwError(() => new Error('Error')));

    component.deleteItem(1);

    setTimeout(() => {
      expect(component.error).toBe('Failed to delete item');
      expect(component.loading).toBeFalse();
      done();
    }, 100);
  });
});
