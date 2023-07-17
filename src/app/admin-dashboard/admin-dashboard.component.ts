import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  showForm: string = 'create-menu'; // Default form to show
  // showForm: string = 'create-menu'; // Default form to show
  menuData: any[] = [];
  feedbackData: any[] = [];
  orderData: any[] = [];
 

  showMenuModal: boolean = false;
  showFeedbackModal: boolean = false;
  showOrderModal: boolean = false;
  createMenuForm = {
    dish_id: 0,
    dish_name: '',
    price: 0,
    availability: true,
    image_url: ''
  };

  removeMenuForm = {
    dishIdToRemove: 0
  };

  updateMenuForm = {
    dishIdToUpdate: 0,
    dishNameToUpdate: '',
    priceToUpdate: 0,
    availabilityToUpdate: true,
    imageUrlToUpdate: ''
  };

  updateOrderStatusForm = {
    orderIdToUpdate:0,
    statusToUpdate: 'open'
  };

  constructor(private http: HttpClient) {}

  createMenu() {
   this.http.post('https://zomapp-e31x.onrender.com/menu/add', this.createMenuForm).subscribe(
    (response: any) => {
      alert(response.message);
      console.log('Create Menu:', this.createMenuForm);
      this.createMenuForm = {
        dish_id: 0,
        dish_name: '',
        price: 0,
        availability: true,
        image_url: ''
      };
    },
    (error: any) => {
      alert('Error occurred while creating menu');
      console.error(error);
    }
  );
  }

  removeMenu() {
    const dishIdToRemove = this.removeMenuForm.dishIdToRemove;
  const endpoint = `https://zomapp-e31x.onrender.com/menu/remove/${dishIdToRemove}`;
  this.http.post(endpoint, {}).subscribe(
    (response: any) => {
      alert('Menu removed successfully');
      console.log('Remove Menu:', this.removeMenuForm);
      this.removeMenuForm = {
        dishIdToRemove: 0
      };
    },
    (error: any) => {
      alert('Error occurred while removing menu');
      console.error(error);
    }
  );
  }

  updateMenu() {
    const dishIdToUpdate = this.updateMenuForm.dishIdToUpdate;
    const endpoint = `https://zomapp-e31x.onrender.com/menu/update/${dishIdToUpdate}`;
    
    const updatedDishName = this.updateMenuForm.dishNameToUpdate;
    const updatedPrice = this.updateMenuForm.priceToUpdate;
    const updatedAvailability = this.updateMenuForm.availabilityToUpdate;
    
    const updatedMenuData = {
      dish_name: updatedDishName,
      price: +updatedPrice,
      availability: updatedAvailability
    };
    
    this.http.post(endpoint, updatedMenuData).subscribe(
      (response: any) => {
        alert('Menu updated successfully');
        console.log('Update Menu:', this.updateMenuForm);
        
        // Reset the form after successful menu update
        this.updateMenuForm = {
          dishIdToUpdate: 0,
          dishNameToUpdate: '',
          priceToUpdate: 0,
          availabilityToUpdate: true,
          imageUrlToUpdate: ''
        };
      },
      (error: any) => {
        alert('Error occurred while updating menu');
        console.error(error);
      }
    );
  }

  updateOrderStatus() {
    const orderIdToUpdate = this.updateOrderStatusForm.orderIdToUpdate;
  const endpoint = `https://zomapp-e31x.onrender.com/order/update-status/${orderIdToUpdate}`;
  
  const newStatus = this.updateOrderStatusForm.statusToUpdate;
  
  const updatedOrderStatusData = {
    status: newStatus
  };
  
  this.http.post(endpoint, updatedOrderStatusData).subscribe(
    (response: any) => {
      alert('Order status updated successfully');
      console.log('Update Order Status:', this.updateOrderStatusForm);
      this.updateOrderStatusForm = {
        orderIdToUpdate: 0,
        statusToUpdate: 'open'
      };
    },
    (error: any) => {
      alert('Error occurred while updating order status');
      console.error(error);
    }
  );
  }

  closeMenuModal() {
    this.menuData = []; // Clear the menu data to close the modal
  }
  openMenuModal() {
    this.http.get('https://zomapp-e31x.onrender.com/menu/get').subscribe(
      (response: any) => {
        this.menuData = response; // Assign the menu data to the menuData variable
        console.log('Menu Data:', this.menuData);
      },
      (error: any) => {
        alert('Error occurred while retrieving menu data');
        console.error(error);
      }
    );
  }
  
  closeFeedbackModal() {
    this.feedbackData = []; // Clear the feedback data to close the modal
  }
  openFeedbackModal() {
    const endpoint = 'https://zomapp-e31x.onrender.com/feedback/get';

    this.http.get(endpoint).subscribe(
      (response: any) => {
        this.feedbackData = response // Store the feedback data in the array
      },
      (error: any) => {
        alert('Error occurred while fetching feedback');
        console.error(error);
      }
    );
  
    this.showFeedbackModal = true;
  }

  openOrderModal() {
    const endpoint = 'https://zomapp-e31x.onrender.com/order/get';

    this.http.get(endpoint).subscribe(
      (response: any) => {
        this.orderData = response; // Store the order data in the array
        this.showOrderModal = true; // Open the order modal
      },
      (error: any) => {
        alert('Error occurred while fetching orders');
        console.error(error);
      }
    );
  
    this.showOrderModal = true;
  }



  getFormTitle() {
    switch (this.showForm) {
      case 'create-menu':
        return 'Create Menu';
      case 'remove-menu':
        return 'Remove Menu';
      case 'update-menu':
        return 'Update Menu';
      case 'update-order-status':
        return 'Update Order Status';
      default:
        return '';
    }
  }
}
