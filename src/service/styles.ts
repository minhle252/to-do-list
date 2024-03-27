
export interface InputField {
	title: string;
	typeInput: string;
	valueInput: any;
	onchangeEvent: any;
	listOption?:any[];
}
export interface FormTask {
	btnText: string;
	clickEvent?: any;
	data?: any;
}
export interface ToDoItem {
	item: any;
	selectedItem?: boolean;
	valueChecked: string;
	changeEvent: any;
} 
export interface ToDoSlice {
	id: string;
	name: string;
	showView: boolean;
	selected: boolean;
	dueDate: string;
	piority: string;
	des: string;
  }