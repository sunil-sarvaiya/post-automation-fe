import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent {
  scheduleForm !: FormGroup;
  filteredPosts: any[] = [];
  selectedPlatform = 'All';
  selectedStatus: any = 'All';
  platformFilterOptions = ['All', 'LinkedIn', 'Facebook', 'Instagram', 'X'];
  statusFilterOptions = ['All', 'Draft', 'Approved', 'Scheduled', 'Rejected'];
  showDialog = false;
  isEdit = false;
  showFilterDialog = false;
  isFilterApplied = false;
  



  constructor() {
    this.scheduleForm = new FormGroup({
      prompt: new FormControl(''), title: new FormControl(''), platform: new FormControl([]), scheduleDate: new FormControl(''), scheduleTime: new FormControl(''), caption: new FormControl(''), hashtags: new FormControl(''), image: new FormControl('https://placehold.co/700x350/png?text=AI+Generated+Image')
    });
    this.filteredPosts = [...this.scheduledPosts];
  }

  columns: any[] = [{ field: 'id', header: 'ID' }, { field: 'title', header: 'Title' }, { field: 'contentType', header: 'Content Type' }, { field: 'platform', header: 'Platform' }, { field: 'scheduledAt', header: 'Schedule Date' }, { field: 'status', header: 'Status' }
  ];

  scheduledPosts: any[] = [
    {
      "id": 1,
      "title": "OpenAI launches GPT-6",
      "contentType": "Trend Commentary",
      "platform": [
        "LinkedIn",
        "X",
        "Instagram",
        "Facebook",
        "Threads"
      ],
      "scheduledAt": "05 Jul 2026 10:00 AM",
      "status": "Approved",
      "prompt": "Write about GPT-6",
      "caption": "OpenAI launches GPT-6 with amazing capabilities.",
      "hashtags": "#AI #GPT6",
      "image": "https://placehold.co/700x350/png?text=GPT-6"
    },
    {
      "id": 2,
      "title": "Google Gemini Update",
      "contentType": "Industry News",
      "platform": [
        "Facebook",
        "Instagram"
      ],
      "scheduledAt": "06 Jul 2026 11:30 AM",
      "status": "Draft",
      "prompt": "Google Gemini Update",
      "caption": "Latest Gemini improvements.",
      "hashtags": "#Gemini",
      "image": "https://placehold.co/700x350/png?text=Gemini"
    },
    {
      "id": 3,
      "title": "Top AI Tools in 2026",
      "contentType": "Thought Leadership",
      "platform": [
        "Instagram"
      ],
      "scheduledAt": "07 Jul 2026 09:00 AM",
      "status": "Scheduled",
      "prompt": "Top AI Tools",
      "caption": "These are the best AI tools.",
      "hashtags": "#AI",
      "image": "https://placehold.co/700x350/png?text=AI+Tools"
    },
    {
      "id": 4,
      "title": "Automation Trends",
      "contentType": "Announcement",
      "platform": [
        "LinkedIn",
        "Instagram",
        "X",
        "Facebook"
      ],
      "scheduledAt": "08 Jul 2026 02:00 PM",
      "status": "Rejected",
      "prompt": "Automation Trends",
      "caption": "Future of automation.",
      "hashtags": "#Automation",
      "image": "https://placehold.co/700x350/png?text=Automation"
    }
  ]


  getValue(row: any, field: keyof any) {
    return row[field];
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Approved': return 'success';
      case 'Draft': return 'secondary';
      case 'Scheduled': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }

  }
  editPost(post: any) {
    this.isEdit = true;
    const dateTime = new Date(post.scheduledAt);
    const scheduleDate = !isNaN(dateTime.getTime()) ? dateTime.toISOString().split('T')[0] : '';
    const scheduleTime = !isNaN(dateTime.getTime()) ? dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
    this.scheduleForm.patchValue({
      prompt: post.prompt || '',
      title: post.title,
      platform: Array.isArray(post.platform) ? post.platform : [post.platform],
      scheduleDate,
      scheduleTime,
      caption: post.caption || '',
      hashtags: post.hashtags || '',
      image: post.image || 'https://placehold.co/700x350/png?text=AI+Generated+Image'
    });
    this.showDialog = true;

  }

  deletePost(id: number) {
    this.scheduledPosts = this.scheduledPosts.filter(x => x.id !== id);
    this.applyFilter();

  }

  postNow(post: any) {
    alert('Posting to ' + post.platform);

  }



  platformOptions = ['LinkedIn', 'Facebook', 'Instagram', 'X'
  ];


  openDialog() {
    this.isEdit = false;
    this.scheduleForm.reset();
    this.scheduleForm.patchValue({
      platform: 'LinkedIn', image: 'https://placehold.co/700x350/png?text=AI+Generated+Image'
    });
    this.showDialog = true;

  }

  closeDialog() {
    this.showDialog = false;

  }

  applyFilter() {
    this.filteredPosts = this.scheduledPosts.filter(post => {
      const platformMatch = this.selectedPlatform === 'All' || post.platform === this.selectedPlatform;
      const statusMatch = this.selectedStatus === 'All' || post.status === this.selectedStatus;
      return platformMatch && statusMatch;
    });
    this.isFilterApplied = this.selectedPlatform !== 'All' || this.selectedStatus !== 'All';
    this.closeFilter();

  }

  resetFilter() {
    this.selectedPlatform = 'All'; this.selectedStatus = 'All';
    this.filteredPosts = [...this.scheduledPosts];
    this.isFilterApplied = false;
    this.closeFilter();

  }

  openFilter() {
    this.showFilterDialog = true;
  }

  closeFilter() {
    this.showFilterDialog = false;
  }

  showPlatformDropdown = false;


  togglePlatformDropdown() {
    this.showPlatformDropdown = !this.showPlatformDropdown;
  }

  isPlatformSelected(platform: string): boolean {
    const values = this.scheduleForm.get('platform')?.value;
    if (!Array.isArray(values)) { return false; }
    return values.includes(platform);

  }
  onPlatformChange(platform: string, event: any) {
    let values = this.scheduleForm.get('platform')?.value;
    if (!Array.isArray(values)) { values = []; }
    values = [...values];
    if (event.target.checked) {
      if (!values.includes(platform)) { values.push(platform); }
    } else {
      values = values.filter((x: string) => x !== platform);
    }
    this.scheduleForm.patchValue({ platform: values });

  }

  getSelectedPlatforms() {
    const values = this.scheduleForm.get('platform')?.value;
    if (!values) { return ''; }
    if (Array.isArray(values)) { return values.join(', '); }
    return values;

  }


}
