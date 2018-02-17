window.onload = () => {

    const form = document.getElementById('vote-form');
 
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

    fetch('http://localhost:3000/routes', {
    })
        .then(res => res.json())
        .then(data => {
            const votes = data.votes;
            const totalVotes = votes.length;
            // Count Vote Points
            const voteCounts = votes.reduce(
                (acc, vote) => (
                    (acc[vote.os] =
                        (acc[vote.os] || 0) + parseInt(vote.points)), acc)
                , {}
            )
  
            let dataPoints = [

                { label: "Windows", y: voteCounts.Windows },
                { label: "MacOs", y: voteCounts.MacOs },
                { label: "Linux", y: voteCounts.Linux },
                { label: "Other", y: voteCounts.Other },

            ];

            const chartContainer = document.querySelector('#chartContainer');

            if (chartContainer) {
                const chart = new CanvasJS.Chart('chartContainer', {

                    animationEnabled: true,
                    theme: 'theme1',
                    title: {
                        text: "Total Votes " + totalVotes
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


                var channel = pusher.subscribe('os-poll');
                channel.bind('pusher:subscription_succeeded', function (members) {
                    //alert('successfully subscribed!');
                    //console.log(members)
                });

                channel.bind('os-vote', function (data) {

                    dataPoints = dataPoints.map(x => {

                        if (x.label == data.os) {
                            x.y += data.points;
                            console.log("itmatches")
                            return x;
                        } else {
                            return x;
                        }

                    });
                    chart.render();
                });


            }

        })
}
