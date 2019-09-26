import { Component, OnInit } from '@angular/core';
import { FormadddataService } from './formadddata.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormAddData } from '../../interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  formadddata: FormGroup;
  changedata: FormGroup;
  info : FormAddData[];
  checklist: number[] = [];
  tododetail: FormAddData;

  constructor(private fb:FormBuilder, private service: FormadddataService) { }
  
  ngOnInit() {
    this.formadddata = this.fb.group({
      todoTitle: ['',[Validators.required]],
      todoDescription: ['',[Validators.required]],
      todoTime: ['',[Validators.required]],
      todoId: ['',[Validators.required]]
    });
    this.changedata = this.fb.group({
      todoTitle: ['',[Validators.required]],
      todoDescription: ['',[Validators.required]],
      todoTime: ['',[Validators.required]],
      todoId: ['',[Validators.required]]
    });
    this.service.getdata()
      .subscribe(
        data => this.info = data,
      );
  }
  itemdata : FormAddData;
  ShowAddForm:boolean = false;
  public idchange;
  hienformdata(info: FormAddData, id:number){
    this.isShow = !this.isShow;
    this.ShowAddForm = false;
    this.itemdata = info;
    this.idchange = info.todoId;
    this.changedata.get('todoId').setValue(this.itemdata.todoId);
    this.changedata.get('todoTitle').setValue(this.itemdata.todoTitle);
    this.changedata.get('todoDescription').setValue(this.itemdata.todoDescription);
    this.changedata.get('todoTime').setValue(this.itemdata.todoTime);
  }
  huybo(){
    this.isShow = !this.isShow;
  }
  
  postform(formadddata: any): void {
    const newinfo = this.formadddata.value;
    this.service.postdata(newinfo)
      .subscribe(postdata => {
        this.info.push(newinfo);
      });
      this.formadddata.reset();
      this.ShowAddForm = false;
  }
  isShow:boolean = true;
  selectid: number;
  checkclick(id : number){
    this.selectid = id;
  }
  deleteselect(): void {
    this.service.deletedata(this.selectid)
    .subscribe();
    window.location.reload();
  }
  suadata(changedata: any): void{
    const newdata = this.changedata.value;
    const danhsachid = this.idchange;
    this.service.updatedata(newdata, danhsachid)
        .subscribe();
        window.location.reload();
  }
  clickdelete(): void {
    const iditem = this.shareID;
    this.service.deletedata(iditem).subscribe(_ => this.info = this.info.filter(td => td.todoId != iditem ));
    this.showDelete = !this.showDelete;
  }
public shareID: number;
  share(id: number){
    this.shareID = id;
    this.showDelete = !this.showDelete;
  }
  deleteAll(): void{
    this.service.deleteall().subscribe(_ => this.info = []);
    window.location.reload();
  }

  deleteSelect(): void{
    const listselected = JSON.stringify(this.checklist);
    this.service.deleteselect(this.checklist).subscribe();
    window.location.reload();
  }
  checked(id: number): void{
    if(this.checklist.find(item => item == id) != null)
    {
      console.log("find true remove");
      this.checklist = this.checklist.filter(item => item != id);
    }
    else
    {
      console.log("find fail add id");
      this.checklist.push(id);
    }
    console.log(`${JSON.stringify(this.checklist)}`);
  }
  onselect(item: FormAddData): void{
    console.log(`${JSON.stringify(item)}`)
    this.tododetail = item;
  } 
  showDelete:Boolean = false;
}
