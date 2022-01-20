import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  messages: Message[];

  constructor(public bsModalRef: BsModalRef,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  confirm(){ 
    this.result = true;
    this.bsModalRef.hide();
  }

  decline(){
  this.result = false;
    this.bsModalRef.hide();
  }
  // deleteMessage(id: number){
    
  //         this.messageService.deleteMessage(id).subscribe(()=>
  //         { // ovdje pomoc 
  //           this.messages.splice(this.messages.findIndex(m=>m.id == id), 1);
  //         })
  //       }

}
