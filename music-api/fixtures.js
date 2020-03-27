const mongoose = require("mongoose");
const config = require("./config");
const nanoid = require("nanoid");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");
const User = require("./models/User");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create(
    {
      username: "user",
      password: "123",
      token: nanoid()
    },
    {
      username: "admin",
      password: "123",
      role: 'admin',
      token: nanoid()
    }
  );

  const [enigma, eminem, bonJovi, tool] = await Artist.create(
    {
      name: "Enigma",
      info:
        "Enigma (от др.-греч. αἴνιγμα «загадка») — немецкий музыкальный проект, созданный Мишелем Крету в 1990 году. Крету является композитором и продюсером проекта, его бывшая жена, певица Сандра Крету, исполняла многие вокальные партии в его композициях. Проект существовал только как студийный, но с 2019 года его участники Andru Donalds, Andreas Harde (Angel X), Fox Lima выступают с концертами под названием «Original Enigma Voices» по всему миру. Всего было выпущено восемь студийных альбомов, девятнадцать синглов и несколько сборников.",
      image: "fixtures/oIHgv1oXkTeTzveIFubDK.jpeg",
      user: user,
      published: true
    },
    {
      name: "Eminem",
      info:
        "Ма́ршалл Брюс Мэ́терс III (англ. Marshall Bruce Mathers III; 17 октября 1972, Сент-Джозеф, Миссури, США)[2], более известный под сценическим псевдонимом Эмине́м (англ. Eminem; стилизовано как EMINƎM) и альтер-эго Слим Шейди (англ. Slim Shady) — американский рэпер, музыкальный продюсер, композитор и актёр. Помимо сольной карьеры, Маршалл также состоял в группе D12 и хип-хоп-дуэте Bad Meets Evil. Эминем является одним из самых продаваемых музыкальных артистов в мире, а также самым продаваемым артистом 2000-х[3]. Он назван одним из самых великих музыкантов всех времён многими журналами, включая Rolling Stone, который разместил Эминема под 83-м номером в списке 100 самых великих артистов[4]. Этот же журнал провозгласил его Королём хип-хопа[5]. Если считать и студийные работы его групп, то у Эминема имеется 12 альбомов, которые достигали первой строчки в Billboard 200[6]. Как сольный артист Эминем продал более 100 миллионов альбомов по всему миру и более 107 миллионов своих записей и 44 миллиона копий своих альбомов только в Америке[7][8][9].",
      image: "fixtures/PP2xkpAHi2YBrRyit0gnB.jpeg",
      user: user
    },
    {
      name: "Bon Jovi",
      info:
        "Bon Jovi — американская рок-группа из Нью-Джерси, образованная в 1983 году. В состав коллектива входят вокалист Джон Бон Джови, клавишник Дэвид Брайан, бас-гитарист Хью Макдональд, гитарист Фил Икс[en] и барабанщик Тико Торрес[6]. На протяжении многих лет состав группы практически не менялся, лишь в 1994 году от них ушёл басист Алек Джон Сач, которого заменил Хью Макдональд. В 2013 году группу покинул гитарист Ричи Самбора[7]. В 2016 году Хью Макдональд и Фил Икс стали полноправными участниками коллектива. Всемирной популярности Bon Jovi поспособствовал альбом Slippery When Wet (1986). В 1990 году, после плотных гастрольных туров и большого количества хитов, группа приостановила деятельность; тогда же Джон Бон Джови и Самбора выпустили по сольному альбому. В 1992 году был выпущен альбом Keep the Faith. Их песня 2000 года «It’s My Life» смогла привлечь внимание более молодой аудитории. Bon Jovi использовали разные стили в своей музыке: так, альбом Lost Highway (2007) включал элементы кантри. Последний на данный момент релиз группы, This House Is Not for Sale, был выпущен 4 ноября 2016 года.\n\nBon Jovi выпустили 13 студийных альбомов, шесть сборников и два концертных альбома. В общей сложности их альбомы были проданы тиражом 130 млн копий[8]. Они отыграли более 2600 концертов в 50 странах перед 34-миллионной аудиторией[9] и в 2006 году были включены в Зал музыкальной славы Великобритании[10]. В 2004 году группа получила награду за музыкальные достижения на American Music Awards[11], а в 2009 году Джон Бон Джови и Ричи Самбора попали в Зал славы композиторов[12][13]. В 2018 году Bon Jovi были включены в «Зал славы рок-н-ролла».",
      image: "fixtures/9ZVylHFRPceMCT-GFUP6p.jpeg",
      user: user
    },
    {
      name: "Tool",
      info:
        "Tool (рус. Инструмент) — американская альтернативная метал группа, образованная в 1990 году в городе Лос-Анджелес, штат Калифорния.\n\nTool стали одной из самых известных прогрессив-рок групп. Усилия по объединению музыкальных экспериментов, изобразительных искусств и текстов-посланий о непрерывном личностном развитии, которые начались с альбома Lateralus и наиболее проявились к альбому 10,000 Days, в итоге привели группу к мировой известности и коммерческому успеху. Tool получили четыре премии «Грэмми», совершили несколько мировых гастролей и спродюсировали альбомы, занявшие первые места в чартах нескольких стран.\n\nИз-за относительно длинных и сложных произведений, так же как и художественной составляющей, группу описывают как неотъемлемую часть прогрессивного и арт-рока.",
      image: "fixtures/MARAYgVVkJY-4vDk2MVeS.jpeg",
      user: user
    }
  );

  const [
    Recovery,
    infinite,
    McMxcAD,
    LeRoi,
    SlipperyWhenWet,
    Fahrenheit,
    Ænima,
    Days
  ] = await Album.create(
    {
      name: "Recovery",
      year: "2010",
      artist: eminem,
      image: "fixtures/5zYkn_MmcW9YBbXQkO86k.jpeg",
      user: user
    },
    {
      name: "Infinite",
      year: "1996",
      artist: eminem,
      image: "fixtures/0CE2fkppE9ki1Qa4P3xZi.jpeg",
      user: user
    },
    {
      name: "McMxc A.D.",
      year: "1990",
      artist: enigma,
      image: "fixtures/0WGtFMf685up_b_svkzEi.jpeg",
      user: user,
      published: true
    },
    {
      name: "Le Roi Est Mort, Vive Le Roi!",
      year: "1996",
      artist: enigma,
      image: "fixtures/RlzkBU9-5dmgq0hYyzf6j.jpeg",
      user: user
    },
    {
      name: "Slippery When Wet",
      year: "1986",
      artist: bonJovi,
      image: "fixtures/WGgFIxo7HB_ayIElXL5Pp.jpeg",
      user: user
    },
    {
      name: "7800º Fahrenheit",
      year: "1985",
      artist: bonJovi,
      image: "fixtures/RyQPr85t4aSXePNLB8bYz.jpeg",
      user: user
    },
    {
      name: "Ænima",
      year: "1996",
      artist: tool,
      image: "fixtures/C7g0LEWi5AxVXFk8CYe7n.jpeg",
      user: user
    },
    {
      name: "10,000 Days",
      year: "2006",
      artist: tool,
      image: "fixtures/x8wlIm2UD9F7xz7U2co1h.jpeg",
      user: user
    }
  );

  await Track.create(
    {
      name: "Cold Wind Blows",
      album: Recovery,
      duration: "5:03",
      sn: "1",
      user: user
    },
    {
      name: "On Fire",
      album: Recovery,
      duration: "3:33",
      sn: "2",
      user: user
    },
    {
      name: "Infinite",
      album: infinite,
      duration: "4:11",
      sn: "1",
      user: user
    },
    {
      name: "Morphing Thru Time",
      album: LeRoi,
      duration: "5:47",
      sn: "1",
      user: user
    },
    {
      name: "Beyond The Invisible",
      album: LeRoi,
      duration: "5:00",
      sn: "2",
      user: user
    },
    {
      name: "Principles Of Lust: Sadeness/Find Love/Sadeness",
      album: McMxcAD,
      duration: "11:43",
      sn: "1",
      user: user,
      published: true
    },
    {
      name: "Mea Culpa",
      album: McMxcAD,
      duration: "5:03",
      sn: "2",
      user: user
    },
    {
      name: "Back To The Rivers Of Belief: Way To Eternity/Hallelujah/The Rivers Of Belief",
      album: McMxcAD,
      duration: "10:36",
      sn: "3",
      user: user
    },
    {
      name: "The Voice Of Enigma",
      album: McMxcAD,
      duration: "2:21",
      sn: "4",
      user: user
    },
    {
      name: "You Give Love A Bad Name",
      album: SlipperyWhenWet,
      duration: "3:43",
      sn: "1",
      user: user
    },
    {
      name: "Livin' On A Prayer",
      album: SlipperyWhenWet,
      duration: "4:10",
      sn: "2",
      user: user
    },
    {
      name: "Wanted Dead Or Alive",
      album: SlipperyWhenWet,
      duration: "5:08",
      sn: "3",
      user: user
    },
    {
      name: "Never Say Goodbye",
      album: SlipperyWhenWet,
      duration: "4:49",
      sn: "4",
      user: user
    },
    {
      name: "In And Out Of Love",
      album: Fahrenheit,
      duration: "4:26",
      sn: "1",
      user: user
    },
    {
      name: "The Price Of Love",
      album: Fahrenheit,
      duration: "4:13",
      sn: "2",
      user: user
    },
    {
      name: "Only Lonely",
      album: Fahrenheit,
      duration: "5:00",
      sn: "3",
      user: user
    },
    {
      name: "Forty Six & 2",
      album: Ænima,
      duration: "6:03",
      sn: "1",
      user: user
    },
    {
      name: "Hooker With A Penis",
      album: Ænima,
      duration: "4:33",
      sn: "2",
      user: user
    },
    {
      name: "Vicarious",
      album: Days,
      duration: "7:06",
      sn: "1",
      user: user
    },
    {
      name: "The Pot",
      album: Days,
      duration: "6:21",
      sn: "2",
      user: user
    },
    {
      name: "Viginti Tres",
      album: Days,
      duration: "5:02",
      sn: "3",
      user: user
    }
  );

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
