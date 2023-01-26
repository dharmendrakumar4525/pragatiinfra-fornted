import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
export interface PeriodicElement {
  SelectAll: string;
  No: string;
  Name: string;
  Email: string;
  Roles:string;
  Action:string;

}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  checked = false;
  displayedColumns = ['SelectAll', 'No', 'name', 'email', 'role',
  'Action']
  dataSource = null;
  users:any
  usersLen:any;
  constructor(private userService:UsersService,private toast:ToastService) { }

  ngOnInit(): void {
    this.userService.getUserss().subscribe(data=>{
      //this.spinner.hide()
      this.users = data
      this.usersLen = this.users.length
      this.dataSource = new MatTableDataSource(this.users);
      //console.log(this.roles)
    })
  }

  deleteUser(id){

    this.userService.deleteUser(id).subscribe(
  
      {
        next: (data: any) =>  {
          console.log(data)
          this.toast.openSnackBar("User deleted Successfully");
          this.userService.getUserss().subscribe(data=>{
            //this.spinner.hide()
            this.users = data
            this.usersLen = this.users.length
            this.dataSource = new MatTableDataSource(this.users);
            //console.log(this.roles)
          })
          
        },
        error: (err) => {
          this.toast.openSnackBar("Something went wrong. Unable to delete Use");
          
  
          
  
        }
      }
  
    )
  }

  // displayedColumns = ['SelectAll', 'No', 'name', 'email', 'role',
  // 'Action'];
  //dataSource = ELEMENT_DATA;

}
 
// const ELEMENT_DATA: PeriodicElement [] = [


//   {SelectAll:'' , No: '1', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '2', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '3', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },

//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },
//   {SelectAll:'' , No: '4', Name: 'Safiya', Email: 'abc@gmail.com',Roles:'develop',
//   Action:'', },





// ];

