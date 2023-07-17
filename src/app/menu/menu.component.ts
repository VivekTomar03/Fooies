import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  showModal: boolean = false;
  cartItems: any[] = [];
  ids: any[] = [];
  orders: any[] = [];
  showOrdersModal: boolean = false;
  showRatingModal: boolean = false;
selectedDish: any;
rating: number=0;
review: string="";
  constructor(private http: HttpClient,private menuService: MenuService) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenuItems().subscribe((response: any) => {
      this.menuItems = response;
    });
  }

  orderNow(item: any) {
    this.cartItems.push(item);
    this.ids.push(item.dish_id)
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  calculateTotalPrice() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  placeOrder() {
    const orderId = Math.floor(100 + Math.random() * 900);
    const customerName = localStorage.getItem('username');
    const order = {
      order_id: orderId,
      customer_name: customerName,
      dish_ids: this.ids
    };
  console.log(order)
     this.http.post('https://zomapp-e31x.onrender.com/order/create', order).subscribe((response: any) => {
     if(response) alert("Order Place successfully"+"OrderID"+orderId)
    this.cartItems = [];
    this.ids= []
    // Close the modal
    this.closeModal();

    
   
  });
  }

  openRatingModal(item: any) {
    this.selectedDish = item;
    this.showRatingModal = true;
  }
  closeRatingModal() {
    this.showRatingModal = false;
    this.rating = 0;
    this.review = '';
  }
  submitFeedback() {
    const feedback = {
      dish_id: this.selectedDish.dish_id,
      rating: this.rating,
      review: this.review
    };
  
    // Make the POST request to submit feedback
    this.http.post('https://zomapp-e31x.onrender.com/feedback/submit', feedback).subscribe((response: any) => {
      // Handle the response
      if (response.message === 'Feedback submitted successfully') {
        // Show a success message or perform any other actions
        console.log('Feedback submitted successfully');
        // Close the rating modal
        this.closeRatingModal();
      } else {
        // Show an error message or handle the error case
        console.log('Error submitting feedback');
      }
    })

  }
  viewOrders() {
    const customerName = localStorage.getItem('username');
    this.http
      .get(`https://zomapp-e31x.onrender.com/order/get-by-customer/${customerName}`)
      .subscribe((response: any) => {
        if (response) {
          this.orders = response;
          this.showOrdersModal = true;
        }
      });
  }

  closeOrdersModal() {
    this.showOrdersModal = false;
  }

}
