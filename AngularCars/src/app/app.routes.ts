import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DesplayCarsComponent } from './desplay-cars/desplay-cars.component';
import { RentCarComponent } from './rent-car/rent-car.component';
// 1. ייבוא הקומפוננטה של התשלום (וודא שהשם והנתיב נכונים אצלך)
import { PaymentComponent } from './payment/payment.component'; 

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: DesplayCarsComponent },
  { path: 'rent', component: RentCarComponent },
  
  // 2. הוספת הנתיב החדש לתשלום
  { path: 'payment', component: PaymentComponent }, 
  
  { path: '**', redirectTo: '' }
];