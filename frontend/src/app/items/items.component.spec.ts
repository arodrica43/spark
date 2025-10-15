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

  it('should handle error when loading items', () => {
    itemService.getItems.and.returnValue(throwError(() => new Error('Error')));

    component.loadItems();

    expect(component.error).toBe('Failed to load items');
    expect(component.loading).toBeFalse();
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
});
