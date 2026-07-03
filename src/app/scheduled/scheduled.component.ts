import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface ScheduledPost {
  id: number;
  title: string;
  contentType: string;
  platform: string;
  scheduledAt: string;
  status: 'Draft' | 'Approved' | 'Scheduled';
}

export interface TableColumn {
  field: keyof ScheduledPost;
  header: string;
}

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent {
scheduleForm !: FormGroup;

  constructor() {
   this.scheduleForm = new FormGroup({
  prompt: new FormControl(''),
  title: new FormControl(''),
  platform: new FormControl('LinkedIn'),
  scheduleDate: new FormControl(''),
  scheduleTime: new FormControl(''),
  caption: new FormControl(''),
  hashtags: new FormControl(''),
  image: new FormControl(
    'https://placehold.co/700x350/png?text=AI+Generated+Image'
  )

});
   }

  columns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Title' },
    { field: 'contentType', header: 'Content Type' },
    { field: 'platform', header: 'Platform' },
    { field: 'scheduledAt', header: 'Schedule Date' },
    { field: 'status', header: 'Status' }
  ];

  scheduledPosts: ScheduledPost[] = [
    {
      id: 1,
      title: 'OpenAI launches GPT-6',
      contentType: 'Trend Commentary',
      platform: 'LinkedIn',
      scheduledAt: '05 Jul 2026 10:00 AM',
      status: 'Approved'
    },
    {
      id: 2,
      title: 'Google Gemini Update',
      contentType: 'Industry News',
      platform: 'Facebook',
      scheduledAt: '06 Jul 2026 11:30 AM',
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Top AI Tools in 2026',
      contentType: 'Thought Leadership',
      platform: 'Instagram',
      scheduledAt: '07 Jul 2026 09:00 AM',
      status: 'Scheduled'
    },
    {
      id: 4,
      title: 'Automation Trends',
      contentType: 'Announcement',
      platform: 'X',
      scheduledAt: '08 Jul 2026 02:00 PM',
      status: 'Approved'
    }
  ];

  getValue(row: ScheduledPost, field: keyof ScheduledPost) {
    return row[field];
  }

  getStatusClass(status: string) {

    switch (status) {

      case 'Approved':
        return 'success';

      case 'Draft':
        return 'secondary';

      case 'Scheduled':
        return 'warning';

      default:
        return 'secondary';

    }

  }

  editPost(post: ScheduledPost) {
    console.log('Edit', post);
  }

  deletePost(id: number) {

    this.scheduledPosts =
      this.scheduledPosts.filter(x => x.id !== id);

  }

  postNow(post: ScheduledPost) {

    alert('Posting to ' + post.platform);

  }

  showDialog = false;
isEdit = false;

platformOptions = [
  'LinkedIn',
  'Facebook',
  'Instagram',
  'X'
];

// scheduleForm = {
//   prompt: '',
//   title: '',
//   platform: '',
//   scheduleDate: '',
//   scheduleTime: '',
//   caption: '',
//   hashtags: '',
//   image:
//     'https://placehold.co/700x350/png?text=AI+Generated+Image'
// };

openDialog() {

  this.showDialog = true;
  this.isEdit = false;

}

closeDialog() {

  this.showDialog = false;

}

}
