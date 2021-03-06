import { SafeMethodCall } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit , OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  @Output() cancelReservation = new EventEmitter();
  datePickerConfig: Partial<BsDatepickerConfig>;
  member:Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[]=[];
  user: User;
  dateOfMeet:Date;


  constructor(public presence: PresenceService,private route:ActivatedRoute,private messageService: MessageService,private accountService:AccountService,
    private memberService:MembersService,private toastr: ToastrService,private router:Router,) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>this.user=user);
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue'});
  }
  

  ngOnInit(): void {
    
   this.route.data.subscribe(data =>{
     this.member = data.member;
   })
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions=[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ]
    this.galleryImages=this.getImages();
  
  }
  getImages():NgxGalleryImage[]
  {
    const imageUrls=[];
    for (const photo of this.member.photos)
    {
      imageUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      })
    }
    return imageUrls;
  }

  

  
  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number)
  {
    this.memberTabs.tabs[tabId].active =true;
  }

  onTabActivated(data: TabDirective)
  {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0)  {
      this.messageService.createHubConnection(this.user,this.member.username);
    }
    else{
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  addReport(member: Member)
  {
    this.memberService.addReport(member.username).subscribe(()=>
    {
      this.toastr.success('You have reported '+ member.knownAs);
    })
  }
  makeReservation(){
    this.toastr.success('You have a date!');
    setTimeout(() => {
      this.router.navigate(["/members"]);
    }, 2000);

  }
  cancel()
{
  this.cancelReservation.emit("1");
}

}
