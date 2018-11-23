const Discord = require("discord.js");
const client = new Discord.Client();


client.on('message', message => {
var prefix = "#"
    if(message.content.startsWith(prefix + 'buy')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Buy Factions");
        let factionsStation = message.guild.channels.find("name", "factions");
        if(!args) {
            return message.channel.send('الرجأء ضع سبب التذكرة.');
        };
                if(!support) {
                    return message.channel.send('**Please make sure that `Buy Factions` role exists and it\'s not duplicated.**');
                };
            if(!factionsStation) {
                message.guild.createChannel("factions", "category");
            };
                message.guild.createChannel(`factions-${message.author.username}`, "text").then(factions => {
                    message.delete()
                        message.channel.send(`لقد تم انشاء تذكرتك. [ ${factions} ]`);
                    factions.setParent(factionsStation);
                    factionsStation.setPosition(1);
                        factions.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            factions.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                factions.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**10 لاعبين | 20 سوا سعودي , 30 فودافون مصري , 2 زين بحريني , 15 لاعبين | 30 سوا سعودي , 40 فودافون مصري , 3 زين بحريني , 20 لاعب | 40 سوا سعودي , 50 فودافون مصري , 4 زين بحريني , شوب اسلحة | 20 سوا سعودي , 30 فودافون مصري , 1 زين بحريني .**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('السبب', args)
                                .addField('صاحب التذكرة', message.author)
                                .addField('الروم', `<#${message.channel.id}>`);
 
                                factions.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.channel.name.startsWith("factions")) {
            return;
        };  
        
        client.on('message',function(message) {
let args = message.content.split(" ").slice(1).join(" ");
if(message.content.startsWith(prefix + "say")) {
if(!args) return;
message.channel.send(`**# ${args}**`); // محطوط # عشان محد يستخدم البوت لتبنيد / طرد احد من السيرفر
}
});
                let embed = new Discord.RichEmbed()
                    .setAuthor("هل انت متأكد انك تريد اغلان التذكرة ؟ لديك 20 ثانية لكي تقرر.")
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {
 
                   
                        const filter = msg => msg.content.startsWith(prefix + 'yes');
                        message.channel.awaitMessages(response => response.content === prefix + 'yes', {
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
