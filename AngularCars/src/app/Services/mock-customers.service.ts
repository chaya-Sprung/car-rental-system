import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CustomerDTO } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class MockCustomersService {
  // Mock database
  private mockCustomers: CustomerDTO[] = [
    {
      Id: 1,
      firstName: 'John',
      lastName: 'Doe',
      idCity: 1,
      email: 'john@example.com',
      numOfLending: 3,
      codePayment: 1
    },
    {
      Id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      idCity: 2,
      email: 'jane@example.com',
      numOfLending: 1,
      codePayment: 2
    },
    {
      Id: 3,
      firstName: 'David',
      lastName: 'Johnson',
      idCity: 1,
      email: 'david@example.com',
      numOfLending: 5,
      codePayment: 1
    }
  ];

  private nextId = 4;

  constructor() { 
    console.log('📦 MockCustomersService initialized');
    console.log('Initial customers:', this.mockCustomers);
  }

  getAll(): Observable<CustomerDTO[]> {
    // Simulate API delay
    return of([...this.mockCustomers]).pipe(delay(500));
  }

  getCustomerById(id: number): Observable<CustomerDTO> {
    console.log(`🔍 Searching for customer ID: ${id}`);
    console.log('Current customers in database:', this.mockCustomers);
    
    const customer = this.mockCustomers.find(c => c.Id === id);
    
    if (customer) {
      console.log(`✅ Found customer:`, customer);
      return of({ ...customer }).pipe(delay(500));
    }
    
    console.log(`❌ Customer ID ${id} not found`);
    // Return error-like response
    return new Observable(observer => {
      setTimeout(() => {
        observer.error({ status: 404, message: 'Customer not found' });
      }, 500);
    });
  }

  insertNewCustomer(customer: CustomerDTO): Observable<any> {
    // Add new customer
    const newCustomer: CustomerDTO = {
      ...customer,
      Id: this.nextId++
    };
    console.log('➕ Adding new customer:', newCustomer);
    this.mockCustomers.push(newCustomer);
    console.log('📝 Updated database:', this.mockCustomers);
    
    // Return the new customer with assigned ID
    return of({ 
      success: true, 
      id: newCustomer.Id,
      Id: newCustomer.Id,
      message: 'Customer added successfully',
      customer: newCustomer
    }).pipe(delay(500));
  }
}

