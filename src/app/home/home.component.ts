import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showChatbot = false;
  userMessage = '';
  chatMessages: ChatMessage[] = [];

  constructor(private chatbotService: ChatbotService) {}

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage() {
    const message = this.userMessage.trim();
    if (message !== '') {
      this.chatMessages.push({ text: message, isUserMessage: true, time: new Date() });
      this.chatbotService.sendMessage(message).subscribe((response: any) => {
        const botReply = response.response;
        this.chatMessages.push({ text: botReply, isUserMessage: false, time: new Date() });
      });
      this.userMessage = '';
    }
  }
}

interface ChatMessage {
  text: string;
  isUserMessage: boolean;
  time: Date;
}
