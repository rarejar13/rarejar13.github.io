function submit(){
  webix.message(JSON.stringify($$("myForm").getValues(), null, 2));
}

var grid = {
  view:"datatable", id:"grid",
  columns:[
    { id:"rank",  editor:"text",  header:"№", css:"rank",  width:50},
    { id:"title", editor:"text",  header:"Имя", fillspace:true},
    { id:"year",  editor:"text",  header:"Адрес" ,  width:400},
    { id:"votes", editor:"text",  header:"Номер телефона",    width:300},
    { id:"votes", editor:"text",  header:"Дата",    width:200}
  ],
  scrollX:false,
  autoConfig:true,
  select:"row", editable:true, editaction:"dblclick",
  url: "/src/data.php",// your custom script for loading
  save:{
    url:"/src/save.php",// your custom script for saving
    autoupdate:false
  }
};

var buttons = {
  view:"toolbar", elements:[
    {
      view:"button", value:"Добавить строку",
      click:function(){
        var data = {
          rank:99, title:"New", year:"2012", votes:"100"
        };
        webix.dp("grid").save(
          webix.uid(),
          "insert",
          data
        ).then(function(obj){
          data.id = obj.id; //server id
          $$("grid").add(data);
          $$("grid").select(data.id);
        }, function(){
          webix.message("Информация не сохранена");
        });
      }
    },
    {
      view:"button", value:"Удалить строку", id:"delBtn",
      click:function(){
        var id = $$("grid").getSelectedId();
        if (id){
          var data = $$("grid").getItem(id.id);
          webix.dp("grid").save(
            data.id,
            "delete",
            data
          ).then(function(){
            $$("grid").remove(id);
          }, function(){
            webix.message("Информация не сохранена");
          });
        }
      }
    },
    {}
  ]
};


webix.ready(function(){
webix.ui({

    rows:[

         { view:"toolbar",
            css:"webix_dark",
            cols:[
         { view:"label", label:"Customer accounting"},
         {},

         {view:"button", value:"Добавить строку",
      click:function(){
        var data = {
          rank:99, title:"New", year:"2012", votes:"100"
        };
        webix.dp("grid").save(
          webix.uid(),
          "insert",
          data
        ).then(function(obj){
          data.id = obj.id; //server id
          $$("grid").add(data);
          $$("grid").select(data.id);
        }, function(){
          webix.message("Информация не сохранена");
        });
      }
    },
            
            {view:"button", value:"Удалить строку", id:"delBtn",
      click:function(){
        var id = $$("grid").getSelectedId();
        if (id){
          var data = $$("grid").getItem(id.id);
          webix.dp("grid").save(
            data.id,
            "delete",
            data
          ).then(function(){
            $$("grid").remove(id);
          }, function(){
            webix.message("Информация не сохранена");
          });
        }
      }
    },
         ]},//header


        {cols:[
            {   view: "list",
                id:"mylist",
                scroll:false,
                select:true,
                width:200,
                css:"list_color",
                data:[
                        {value:"Dashboard",},
                        {value:"Users"},
                        {value:"Products"},
                        {value:"Location"}
                    ]},//sidebar

            {view:"datatable", id:"grid",
              columns:[
                      { id:"rank",  editor:"text",  header:"№", css:"rank",  width:50},
                      { id:"title", editor:"text",  header:"Имя", fillspace:true},
                      { id:"year",  editor:"text",  header:"Адрес" ,  width:400},
                      { id:"votes", editor:"text",  header:"Номер телефона",    width:300},
                      { id:"votes", editor:"text",  header:"Дата",    width:200}
                      ],
              scrollX:false,
              autoConfig:true,
              select:"row", editable:true, editaction:"dblclick",
              url: "/src/data.php",// your custom script for loading
              save:{
              url:"/src/save.php",// your custom script for saving
              autoupdate:false
              }}, 
            ]},//table

        {cols:[{height: 30, template:"homenet.it", css:"center_text"}]}//footer
    ]
});
});