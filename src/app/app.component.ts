import { Component } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chatMessageControl = new FormControl('');
  showChatbot = false;

  constructor(private chatbotService: ChatbotService) {}

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage() {
    const message = this.chatMessageControl.value;
    this.chatbotService.sendMessage(message).subscribe((response: any) => {
      const botReply = response.response;
      // Process the bot reply as needed
      console.log(botReply);
    });
    this.chatMessageControl.reset();
  }
}
