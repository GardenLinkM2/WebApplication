import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Garden} from '../../@entities/garden';
import {User} from '../../@entities/user';
import {Score} from '../../@entities/score';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScoresService} from '../../services/scores/scores.service';
import {UserService} from '../../services/user-info/user.service';

@Component({
  selector: 'app-ad-details-comments',
  templateUrl: './ad-details-comments.component.html',
  styleUrls: ['./ad-details-comments.component.scss']
})
export class AdDetailsCommentsComponent implements OnInit, OnChanges {

  @Input() garden: Garden;
  @Input() owner: User;
  commenters: User[] = [];
  comments: Score[] = [];
  newComment = '';
  commentsTotalNumber = 0;
  commentsShown: ({commentId: string; isReported: boolean})[] = [];

  constructor(private scoresService: ScoresService, private userService: UserService) {
  }

  ngOnInit() {
    this.getComment();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  onPostComment() {
    const comment: Score = {id: undefined, comment: '', mark: undefined, rated: undefined, rater: undefined};
    comment.comment = this.newComment;
    if (comment.comment.trim().length > 0) {
      this.scoresService.postScoreToGarden(this.garden.id, comment).subscribe((result: { data: Score }) => {
        this.comments.push(result.data);
        this.commentsShown.push({commentId: result.data.id, isReported: false });
        this.ngOnInit();
        this.newComment = '';
      });
    }
  }

  getComment() {
    this.commentsShown = [];
    if (localStorage.getItem('id')) {
      this.scoresService.getScoresByGarden(this.garden.id).subscribe((result: { data: Score[]; count: number; }) => {
        for (const com of result.data) {
          this.commentsShown.push({commentId: com.id, isReported: false});
        }
        this.comments = result.data;
        const userIdSet: Set<string> = this.getUserSetForComment();
        for (const userId of userIdSet) {
          this.getUser(userId);
        }
        this.commentsTotalNumber = result.count;
      });
    }
  }

  getUserSetForComment() {
    const setUserId = new Set<string>();
    this.comments.forEach(comment => {
      setUserId.add(comment.rater);
    });
    return setUserId;
  }

  getUser(userId: string) {
    this.userService.getUserById(userId).subscribe((result: User) => {
      if (!result.avatar.includes('/uploadm2.artheriom.fr')) {
        result.avatar = '../../../assets/img/defaultavatar.png';
      }
      this.commenters.push(result);
    });
  }

  findCommenterById(userId: string): User {
    return this.commenters.find(user => !user.id.localeCompare(userId));
  }

  onRepondre(raterId: string) {
    const user = this.findCommenterById(raterId);
    document.getElementById('text-area').focus();
    this.newComment = '@' + user.firstName + ' ' + user.lastName + ' ' + this.newComment;
  }

  onReport(reportId: string) {
    this.scoresService.reportComment(reportId).subscribe(() => {
      this.getCommentShown(reportId).isReported = true;
    });
  }

  getCommentShown(reportId: string) {
    return this.commentsShown.find(com => !com.commentId.localeCompare(reportId)) || {commentId: '', isReported: false};
  }
}
