
$(document).ready(function () {
    
    let min = 00;
    let hour = 00;
    let secend = 00;

    const fetchTime = (continent, country) => {
        fetch(`http://worldtimeapi.org/api/timezone/${continent}/${country}`)
            .then(res => res.json())
            .then(data => {
                let time = data.datetime.substring(
                    data.datetime.lastIndexOf("T") + 1,
                    data.datetime.lastIndexOf(".")
                );
                hour = parseInt(time.substring(0, 2))
                min = parseInt(time.substring(3, 5))
                secend = parseInt(time.substring(6, 8))
                $("#hour").text(hour);
                $("#secend").text(secend);
                $("#min").text(min);
                $("#city").text(data.timezone);
                console.log(data);

            })
    }

    fetchTime("Asia", "Tehran");

    const chenge = () => {

        secend++
        if (secend >= 60) {
            secend = 0;
            min++;
        }
        $("#hour").text(hour);
        $("#secend").text(secend);
        $("#min").text(min);


    }
    
    let timer = setInterval(chenge, 1000)


/////make Button for continent
    let chek = ""
    $.getJSON("http://worldtimeapi.org/api/timezone", (data)=>{
        for (let i  in data) {
            let city = data[i].substring(
                0,
                data[i].lastIndexOf("/")
            );
                let n = data[i].search("/")
                if(n<0){
                    city = data[i]
                }
                
                
                if(i==1){
                    chek = city;
                }

                if(chek !== city ){
                    chek = city
                $(".buttonAria").append(`<button id="continent" name=${city}>${city}</button>`);
                }
           
            
        }
        
    }
    );

    ///make cityButton in continent
    $(".buttonAria").on("click", "button#continent", function(){
        $.getJSON(`http://worldtimeapi.org/api/timezone/${this.name}`, (data)=>{
       
        for(let i in data){
            let city = data[i].substring(
                data[i].lastIndexOf("/")+1,
                data[i].length
            )
            let continent = data[i].substring(
                0,
                data[i].lastIndexOf("/")
            )
            $(".buttonAriacity").append(`<button id="cityButton"  city=${city} continent=${continent}>${city}</button>`);
        }
        $(".buttonAriacity").fadeIn(); 
        $(".backButton").css("display", "flex");
        })
    });
//////////set CliCK for City BUtton
    $(".buttonAriacity").on("click", "button#cityButton",function(){
        let mycity=$(this).attr("city");
        let mycontinent = $(this).attr("continent");
        fetchTime(mycontinent,mycity)
    })
///Back Button 
$(".backButton").click(function (e) { 
    $(".buttonAriacity").fadeOut();
    $(".backButton").fadeOut();
    $(".buttonAriacity").empty();
});
});

