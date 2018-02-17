window.onload = () => {

    const form = document.getElementById('vote-form');
    const event = document.getElementById('sendevent');
    event.addEventListener('click',e=>{


        fetch('http://localhost:3000/routes',{


            method:'get',
            headers: new Headers({
                'Content-Type':'application/json'
            })

        })  

    })
    //FORM SUBMIT EVENT
    form.addEventListener('submit', e => {

        const choice = document.querySelector('input[name=os]:checked').value;
        console.log(choice);
        const data = { os: choice };

        fetch('http://localhost:3000/routes', {

            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({

                'Content-Type': 'application/json'

            })


        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        e.preventDefault();

    })

    let dataPoints = [

        { label: "Windows", y: 4 },
        { label: "MacOs", y: 0 },
        { label: "Linux Distro", y: 0 },
        { label: "Other", y: 0 },

    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
        console.log("chartContainer Exists")
        const chart = new CanvasJS.Chart('chartContainer', {

            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: 'Os Results'
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }

            ]

        });

        chart.render();


        Pusher.logToConsole = true;

        var pusher = new Pusher('aab3c05cf0b2d470a486', {
            cluster: 'us2',
            encrypted: true
        });
        console.log(pusher)
        //var channel = pusher.subscribe('my-channel');

      
        
            

             var channel = pusher.subscribe('os-poll');
              channel.bind('pusher:subscription_succeeded', function (members) {
                alert('successfully subscribed!');
                console.log(members)
            });
   
        channel.bind('os-vote', function(data) {
           
            dataPoints = dataPoints.map(x => {

                if (x.label == data.os) {
                    x.y += data.points;
                    console.log("itmatches")
                    return x;
                } else {
                    return x;
                }

            });
            //required callback...
           chart.render();
        });

       
    }
}