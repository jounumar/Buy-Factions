const Discord = require("discord.js");
const client = new Discord.Client();


client.on('message', message => {
var prefix = "#"
    if(message.content.startsWith(prefix + 'buy')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Buy Factions");
        let ticketsStation = message.guild.channels.find("name", "Factions");
        if(!args) {
            return message.channel.send('الرجأء ضع سبب التذكرة.');
        };
                if(!support) {
                    return message.channel.send('**Please make sure that `Buy Factions` role exists and it\'s not duplicated.**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("Factions", "category");
            };
                message.guild.createChannel(`Factions-${message.author.username}`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`لقد تم انشاء تذكرتك. [ ${ticket} ]`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**10 لاعبين | 20 سوا سعودي , 30 فودافون مصري , 2 زين بحريني , 15 لاعبين | 30 سوا سعودي , 40 فودافون مصري , 3 زين بحريني , 20 لاعب | 40 سوا سعودي , 50 فودافون مصري , 4 زين بحريني , شوب اسلحة | 20 سوا سعودي , 30 فودافون مصري , 1 زين بحريني .**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('صاحب التذكرة', message.author)
 
                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'اغلق')) {
        if(!message.channel.name.startsWith("ticket")) {
            return;
        };  
                let embed = new Discord.RichEmbed()
                    .setAuthor("هل انت متأكد انك تريد اغلان التذكرة ؟ لديك 20 ثانية لكي تقرر.")
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {
 
                   
                        const filter = msg => msg.content.startsWith(prefix + 'نعم');
                        message.channel.awaitMessages(response => response.content === prefix + 'نعم', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            message.channel.delete();
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**Operation has been cancelled.**')) .then((c) => {
                                    c.delete(4000);
                                })
                                   
                           
                        })
 
 
                    })
 
 
           
    }
});



client.login(process.env.BOT_TOKEN);
