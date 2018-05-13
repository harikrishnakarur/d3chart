angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    var toolTipToDisplay = {
        age: "Age",
        population: "Population"
    };
    var data = [
{age:"<5",population:2704659},
{age:"5-13",population:4499890},
{age:"14-17",population:2159981},
{age:"18-24",population:3853788},
{age:"25-44",population:14106543},
{age:"45-64",population:8819342},
{age:"≥65",population:612463}
    ]
    todoList.data = {
        toolTipToDisplay: toolTipToDisplay,
        colors: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
        data: data,
        drawAnimation: true,
        category: "age",
        value: "population"
    }
    todoList.hello = "Hello!!"
    
    ///////////////////////////////
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });