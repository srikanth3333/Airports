import React, { Component } from 'react';

import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable,
  TextInput
} from "react-native";
import { size } from "../../assets/size";
import { 
    MontserratBold,
    MontserratRegular,
    OpenSansBold,
    OpenSansRegular,
} from "../../assets/font";
import { BackgroundImage } from "../../components/Login/index";
import { Storestyles } from "./styles";
import DropDown from "../../components/DropDown";
import { SearchBox } from "../../components/Home";
import Header from "../../components/Header";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../assets/styles'

let dataText = [
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/7-Eleven",
    "title": "7-ELEVEN",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From tidbits to travel toiletries, the convenience store in KLIA is stocked with items that you would need for your journey.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/2/shop_and_dine/shopping/AL_Jasmine_Telco_magazine.xml",
    "title": "AL JASMINE (TELCO, MAGAZINE)",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Find fresh to-go foods, locally made snacks, unique candies, cold beverages as well as magazines, postcards and basic medication here.",
    "location": "KLIA (MTB) - Level 2"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/BALLY.xml",
    "title": "BALLY",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Together with his brother Fritz, Carl Franz employed designers to assist and together, they began producing shoes made entrirely by hand in the cellar of his Schonenwerd home.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Bath_and_Body_Works",
    "title": "BATH & BODY WORKS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Drop by Bath & Body Works and indulge like never before!",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Book_amp_Magazines.xml",
    "title": "BOOKS & MAGAZINES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Pick up some reading material for your pre-flight or in-flight entertainment at Books & Magazines.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Braun_Buffel.xml",
    "title": "BRAUN BUFFEL",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With leather bags, wallets, belts and other accessories for men and women, Braun Bffel's products exude an elegance that is both classic and contemporary. Anyone who carries a Braun Bffel can be assured not only of quality products but also of sophisticated flair.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/BVLGARI.xml",
    "title": "BVLGARI",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With quality and excellence as its byword, each piece that bears the Bvlgari title is carefully crafted for a sophisticated style that is both unmistakable and timeless.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Charles_amp_Keith.xml",
    "title": "CHARLES & KEITH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With attention to design and trends, Charles & Keith has become one of the most marketable fashion footwear brands in today's international scene.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Charles_amp_Keith.xml",
    "title": "CHARLES & KEITH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With attention to design and trends, Charles & Keith has become one of the most marketable fashion footwear brands in today's international scene.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/CHOCOLATES.xml",
    "title": "CHOCOLATES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "A wholly-owned subsidiary of Malaysia Airports, Eraman is renowned for a wide range of duty-free and non duty-free products that come at good prices with great customer services.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Chocolates__Arrival_Duty_Free.xml",
    "title": "CHOCOLATES @ ARRIVAL DUTY FREE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "A wholly-owned subsidiary of Malaysia Airports,Eraman is renowned for a wide range of duty-free and non duty-free products that come at good prices with great customer services.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Chocolates__Satellite_Duty_Free.xml",
    "title": "CHOCOLATES @ SATELLITE DUTY FREE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "The world's most award-winning chocolate shop, Choc Stop International plays host to over 35 of the best-loved chocolates",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/CIGARS.xml",
    "title": "CIGARS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Cigars offer tobacco lovers everything they need to enjoy their smoke.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Coach.xml",
    "title": "COACH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Famous the world over for the exquisite quality of their timeless designs, Coach creates beautiful leather goods and accessories.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/COACH.xml",
    "title": "COACH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Famous the world over for the exquisite quality of their timeless designs, Coach creates beautiful leather goods and accessories.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/COLOURS_amp_FRAGRANCES.xml",
    "title": "COLOURS & FRAGRANCES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With more than 20 years of experience, Colours & Fragrances is a market leader and one of the pioneers in the beauty travel retail industry in Malaysia.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Colours_Beauty_Boutique.xml",
    "title": "COLOURS BEAUTY BOUTIQUE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With a huge range of fragrances, cosmetics and beauty care products, we have whatever a fashionista might need to freshen up or gain a whole new look.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Convenience_Store.xml",
    "title": "CONVENIENCE STORE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From tidbits to travel toiletries, the convenience store in KLIA is stocked with items that you would need for your journey.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/g/shop_and_dine/shopping/Convenience_Store.xml",
    "title": "CONVENIENCE STORE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From tidbits to travel toiletries, the convenience store in KLIA is stocked with items that you would need for your journey.",
    "location": "KLIA (MTB) - Level g"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Delicacies of Malaysia",
    "title": "DELICACIES OF MALAYSIA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Discover the unique delicacies and local treats that embody the best of Malaysia at Delicacies of Malaysia.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/DFZ_Liquor_amp_Tobacco.xml",
    "title": "DFZ LIQUOR & TOBACCO",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Whether you're looking for cigarettes and cigars, or wine and liquor, they're right here at Eraman!",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/DIMENSI_EKSKLUSIF_PERFUMES_amp_COSMETICS.xml",
    "title": "DIMENSI EKSKLUSIF PERFUMES & COSMETICS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "A little scent and make-up can go a long way to freshening up a tired traveller and Dimensi Eksklusif has just the thing for you.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Dior",
    "title": "DIOR",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With a huge range of iconic fragrances, cosmetics and beauty care products, we have whatever a fashionista might need to freshen up or gain a whole new look.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Eraman_Duty_Free_East.xml",
    "title": "ERAMAN DUTY FREE (EAST)",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Whether you're looking for chocolates and snacks, cigarettes or cigars, wine or liquor, perfumes and cosmetics, or fashion products and accessories, they're right here at Eraman!",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Eraman_Duty_Free_North.xml",
    "title": "ERAMAN DUTY FREE (NORTH)",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Whether you're looking for chocolates and snacks, cigarettes or cigars, wine or liquor, perfumes and cosmetics, or fashion products and accessories, they're right here at Eraman!",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/4/shop_and_dine/shopping/Eraman_Duty_Free_Shopping_Mall__Contact_Pier.xml",
    "title": "ERAMAN DUTY FREE SHOPPING MALL @ CONTACT PIER",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Now, whenever you are travelling through KLIA, you will be greeted with a unique level of shopping experience at Eraman's very own lifestyle mall.",
    "location": "KLIA (MTB) - Level 4"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Eraman_Express_Mart.xml",
    "title": "ERAMAN EXPRESS MART",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From tidbits to travel toiletries, the convenience store in KLIA is stocked with items that you would need for your journey.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Eraman_Fragrance_amp_Cosmetics.xml",
    "title": "ERAMAN FRAGRANCE & COSMETICS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Perfumes & Cosmetics (Departure Hall) Level 5, Main Terminal Building, KLIA is designed with a classic boutique concept. This exclusive space showcases branded designer fragrances and a mesmerizing selection of beauty products to choose from.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/4/shop_and_dine/shopping/Eraman_THE_FASHION_PLACE.xml",
    "title": "ERAMAN THE FASHION PLACE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Whether you're looking for chocolates and snacks, cigarettes or cigars, wine or liquor, perfumes and cosmetics, or fashion products and accessories, they're right here at Eraman!",
    "location": "KLIA (MTB) - Level 4"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Eraman_Time_to_Time.xml",
    "title": "ERAMAN TIME TO TIME",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Now is the best time to visit our latest retail outlet for timepieces FROM TIME TO TIME.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/cn/klia/p/shop_and_dine/shopping/Eraman_Duty_Free_East.xml",
    "title": "ERAMAN 免税店 （东EAST）",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "无论您是在寻找香烟和雪茄、还是葡萄酒和烈酒，一切尽在Eraman！",
    "location": "KLIA (STB) - Level M"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Eramans_Liquor_Kiosk_Gate.xml",
    "title": "ERAMAN'S LIQUOR KIOSK GATE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Whether you're looking for chocolates and snacks, cigarettes or cigars, wine or liquor, perfumes and cosmetics, or fashion products and accessories, they're right here at Eraman!",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Famous_Amos.xml",
    "title": "FAMOUS AMOS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From Wally Amos's family recipe comes the ultimate chocolate chip cookie.With nine varieties baked daily, you can be sure our cookies are the same delicious homemade-tasting ones that came hot from Wally Amos's own oven.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Famous_Amos.xml",
    "title": "FAMOUS AMOS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From Wally Amos's family recipe comes the ultimate chocolate chip cookie. With nine varieties baked daily, you can be sure our cookies are the same delicious homemade-tasting ones that came hot from Wally Amos's own oven.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Giorgio_Armani.xml",
    "title": "GIORGIO ARMANI",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Leading perfume and cosmetic company in travel retail, Colours & Fragrances (C&F), has extended its portfolio of perfume and cosmetic stores in Malaysia.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/GODIVA.xml",
    "title": "GODIVA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Godiva is renowned for sinfully delicious confectionaries. From exquisite gourmet chocolate pieces to scrumptious dark chocolate bars, Godiva promises to take your taste buds on a ride they'll never forget.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Hamleys.xml",
    "title": "HAMLEYS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "William Hamley's famous toy shop developed an international reputation for choice, quality and innovation!",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Hermes.xml",
    "title": "HERMES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From gorgeous handbags to stylish clothes, Hermes is renowned for its uncompromising quality and elegantly timeless styles.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/HUGO_BOSS.xml",
    "title": "HUGO BOSS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "There is a selection of travel-friendly clothes available, such as easy-iron, moisture absorbing knitwear that will keep you comfortably relaxed during your flight.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/JO_MALONE.xml",
    "title": "JO MALONE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "An exclusive collection for the bath, body and home.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/KARYANEKA.xml",
    "title": "KARYANEKA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With affordable prices, beautiful designs, great quality, and a diverse national heritage to draw from, Karyaneka is that perfect place to find a great souvenir or gift to bring home.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/KASHKHA.xml",
    "title": "KASHKHA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Arabic Fashion definitely has a place in the modern world, and KASHKHA certainly reinforces that by showing travelers from around the globe the contemporary and chic Arabic fashionwear.They firmly believe that  You are what you wear and take pride in clothing women in outfits that match both their beauty and spirit.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Kens Apothecary",
    "title": "KENS APOTHECARY",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "KENS first brought about a beauty and skincare retail revolution where it proactively and progressively brought in cult brands like Diptyque, Creed, Annick Goutal, Dr Brandt and Cire Trudon.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/KHAZANAH.xml",
    "title": "KHAZANAH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With products ranging from fashion and accessories to home decorations, Khazanah is not your average souvenir shop.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Khazanah_Exotic.xml",
    "title": "KHAZANAH EXOTIC",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With products ranging from fashion and accessories to home decorations, Khazanah is not your average souvenir shop.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Kiddies.xml",
    "title": "KIDDIES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Kiddies offering passengers a special selection of toys and gifts from around the world.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/4/shop_and_dine/shopping/Kidz_SMART_Tunnel.xml",
    "title": "KIDZ SMART TUNNEL",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "The Kidz Smart Tunnel is an award winning outlet with an open tunnel concept featuring colourful arches over the passageway.",
    "location": "KLIA (MTB) - Level 4"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/LOccitane.xml",
    "title": "L'OCCITANE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "L'Occitane focuses on creating genuine products by working with committed produces who set rigorous standards on their produce, so that every L'Occitane product is the cream of the crop.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/LANCOME",
    "title": "LANCOME",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With a huge range of iconic fragrances, cosmetics and beauty care products, we have whatever a fashionista might need to freshen up or gain a whole new look.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Lao_Jie_Fang_North.xml",
    "title": "LAO JIE FANG (NORTH)",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Either on business trip, vacation or visiting friend & relative on board, you can get LOKE KEE & Master Fong products here.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Little Malaysia",
    "title": "LITTLE MALAYSIA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Looking for last minute momentos to bring back home? Little Malaysia is the perfect place for that! From T-shirts, fridge magnets to corporate gifts - there's something for everyone to remind them of Malaysia.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/LJF_PREMIUM_GIFTS.xml",
    "title": "LJF PREMIUM GIFTS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Either on business trip, vacation or visiting friend & relative on board, you can get LOKE KEE & Master Fong products here.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Lonely_Planet_and_Billabong.xml",
    "title": "LONELY PLANET AND BILLABONG",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "As today's leader in travel content, you can find travel information on just about every corner of the earth, with guidebooks in nine different languages.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Longchamp.xml",
    "title": "LONGCHAMP",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Constantly looking to push function and form, Longchamp is a little treasure trove of luxury just waiting to be indulged in.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Made_in_Malaysia.xml",
    "title": "MADE IN MALAYSIA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "For a taste of Malaysia's diverse culture and heritage, you need only to enter Made In Malaysia.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/MALAYSIAN_HERITAGE_amp_SOUVENIRS.xml",
    "title": "MALAYSIAN HERITAGE & SOUVENIRS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With a shop that is full of tradition, timeless elegance and contemporary aptitude, Malaysian Heritage & Souvenirs is the best place for anyone looking for a rich piece of Malaysia cultural heritage.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/MCM.xml",
    "title": "MCM",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "MCM is renowned for excellence in European craftsmanship.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Michael_Kors.xml",
    "title": "MICHAEL KORS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Michael Kors is the leading American fashion designer for luxury accessories and sportswear.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/MICHAEL_KORS.xml",
    "title": "MICHAEL KORS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Michael Kors is the leading American fashion designer for luxury accessories and sportswear.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/MONTBLANC.xml",
    "title": "MONTBLANC",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With an exquisite collection of cufflinks, timepieces, leather products, letter openers and of course, their iconic fountain pens, Montblanc offers the best in men's luxury.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/MONTBLANC.xml",
    "title": "MONTBLANC",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "With an exquisite collection of cufflinks, timepieces, leather products, letter openers and of course, their iconic fountain pens, Montblanc offers the best in men's luxury.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Pedro.xml",
    "title": "PEDRO",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Pedro embodies modern luxury and style with a line of footwear and accessories in a smart twist of timeless classics with international influence for men and women,with emphasis on channelling heightened fashion acumen each season.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/POLO_RALPH_LAUREN.xml",
    "title": "POLO RALPH LAUREN",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "From mesh knit polo shirts to leather goods, Ralph Lauren invites you to join in the dream.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Rolex.xml",
    "title": "ROLEX",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Only official Rolex retailers are allowed to sell and maintain a Rolex.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/ROLEX.xml",
    "title": "ROLEX",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Only official Rolex retailers are allowed to sell and maintain a Rolex.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Royal_Selangor.xml",
    "title": "ROYAL SELANGOR",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Renowned for its quality pewter products, Royal Selangor offers hundreds of items, all of which are made by Malaysian craftsmen.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/ROYAL_SELANGOR.xml",
    "title": "ROYAL SELANGOR",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Renowned for its quality pewter products, Royal Selangor offers hundreds of items, all of which are made by Malaysian craftsmen.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Salvatore_Ferragamo.xml",
    "title": "SALVATORE FERRAGAMO",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Initially famed for creating unique, handmade shoes that combined innovation with style, Salvatore Ferragamo is now synonymous with exclusive designs.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Sunglass_Hut.xml",
    "title": "SUNGLASS HUT",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Sunglass Hut is the specialized sun store retailer with more than 3,000 retail locations worldwide.With a global reputation for its premium sunglass brands, Sunglass Hut offers the latest designer brands alongside outstanding customer service.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Swarovski",
    "title": "SWAROVSKI",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Shine bright with Swarovski's gorgeous crystals, jewellery, accessories, watches, ortitlents and more.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Swiss_Watch_Gallery.xml",
    "title": "SWISS WATCH GALLERY",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Swiss Watch Gallery is the premier Malaysian-owned regional luxury watch retailer, presenting arguably the most comprehensive collection of international iconic watch brands under one umbrella.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/Taste_of_Malaysia.xml",
    "title": "TASTE OF MALAYSIA",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "A one stop center to shop for Malaysian delights with a variety of sweets, tibits and biscuits.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/The_Body_Shop.xml",
    "title": "THE BODY SHOP",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "The Body Shop is renowned for naturally-inspired products that are 100% vegetarian.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/5/shop_and_dine/shopping/Time",
    "title": "TIME",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Check out the wide collection of timepieces available here to ensure you are always on track.",
    "location": "KLIA (MTB) - Level 5"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/TIME.xml",
    "title": "TIME",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "As the official retailer for a wide selection of timepieces, Time carries wide range of brands.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/TORY_BURCH.xml",
    "title": "TORY BURCH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Tory Burch is an American lifestyle brand that embodies the personal style and sensibility of its chairman, ceo and designer, Tory Burch.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/TUMI.xml",
    "title": "TUMI",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Renowned for its soft, ultra-functional, black-on-black ballistic nylon travel bags, Tumi is the world's leading brand of luxury travel, business and lifestyle accessories.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/TUMI.xml",
    "title": "TUMI",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Renowned for its soft, ultra-functional, black-on-black ballistic nylon travel bags, Tumi is the world's leading brand of luxury travel, business and lifestyle accessories.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/TWG.xml",
    "title": "TWG",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "TWG Tea is the finest luxury tea brand in the world.Specializing in whole-leaf teas from source estates.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/VERSACE.xml",
    "title": "VERSACE",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Renowned for daring and exclusive designs, the Versace boutique offers a select collection of its high-end accessories.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/3/shop_and_dine/shopping/Victorias_Secret.xml",
    "title": "VICTORIA'S SECRET",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Victorias Secret Beauty offers customers access to an assortment of the best-selling Victorias Secret Beauty products, from prestige fragrances to body care.",
    "location": "KLIA (MTB) - Level 3"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/VICTORIAS_SECRET_Beauty_amp_Accessories.xml",
    "title": "VICTORIA'S SECRET BEAUTY & ACCESSORIES",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "Stylish and audacious, Victoria's Secret offers fragrances and cosmetics as well as lingerie.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/WHSmith.xml",
    "title": "WHSMITH",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "WHSmith is a well known and well loved iconic British news, books and convenience retailing brand.",
    "location": "KLIA (STB) - Level p"
  },
  {
    "path": "templatedata/content/content-blocks/data/en/klia/p/shop_and_dine/shopping/WHSmith_Express.xml",
    "title": "WHSMITH EXPRESS",
    "subCategory": "Shopping","img":require("../../assets/Images/listImg.jpeg"),
    "description": "WHSmith is a well known and well loved iconic British news, books and convenience retailing brand.",
    "location": "KLIA (STB) - Level p"
  }
]
class Stores extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dropDown: [
                { label: "KLIA", value: "klia" },
                { label: "KLIA2", value: "klia2" },
              ],
            dataSource: null,
            gridState: 'list',
        }
    }

    onChangeText(data) {
      let result = dataText.filter(object => object.title.includes(data.toUpperCase()) ? object : null)
      this.setState({ dataSource: result})
    }


    componentDidMount() {
      this.setState({
        dataSource: dataText
      })
    }


    render(){
        const { dataSource } = this.state;
        return(
      <Storestyles.ViewArea>
      <BackgroundImage img={require("../../assets/Images/Promotions-BG.png")}/>
      <Storestyles.Alignment>
          <Storestyles.mainText>STORES</Storestyles.mainText>
          <View style={{ width: "30%",marginRight:5 }}>
          <DropDown
              list={this.state.dropDown}
              borderColor={"#F1DDE9"}
              onSelectValue={(value) => {
                this.setState({ terminal: value, dropDownOpen: false });
              }}
              borderRadius={25}
              borderWidth={1}
              height={40}
              selectedValue={this.state.terminal}
              placeholder={"KLIA"}
              dropDownOpen={() =>
                this.setState({
                  dropDownOpen: true,
                })
              }
              dropDownClose={this.state.dropDownOpen}
            />
            </View>
      </Storestyles.Alignment>
      <Storestyles.container>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:20,paddingHorizontal:17}}>
           <Header routeNameData={this.props.navigation} /> 
           <Storestyles.boldTitle>STORES</Storestyles.boldTitle>
           <Storestyles.AlignmentII>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Evoucher')}>
           <Storestyles.lightTitle>E-Vouchers</Storestyles.lightTitle>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Evoucher')}>
           <Image style={{height:30,width:50}}source={require("../../assets/Images/EVoucher.png")}/>
           </TouchableOpacity>
          </Storestyles.AlignmentII>
       </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10,paddingHorizontal:17,justifyContent:"space-between"}}>
          <View style={{ width: "68%" ,}}>
            <TouchableOpacity>
              <View style={styles.searchBoxContainer}>
                <TextInput
                      style={styles.searchPlaceHolder}
                      onChangeText={(text) => this.onChangeText(text)}
                      placeholder={"Search For Shops"}
                />
                <Image
                  source={require("../../assets/Images/magni.png")}
                  style={styles.magniIcon}
                />
              </View>
            </TouchableOpacity>
            {/* <SearchBox  onChangeHandler={(text) => this.onChangeText(text)}   onPlaceholder={"Search For Shops"}/> */}
            </View>
            <View style={{ width: "20%" , flexDirection:"row",justifyContent:"space-around"}}>
              <TouchableOpacity onPress={() => this.setState({gridState: 'list'})}><Storestyles.icon  source={require("../../assets/Images/List.png")}/></TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({gridState: 'grid'})}><Storestyles.icon  source={require("../../assets/Images/Grid.png")}/></TouchableOpacity>
           </View>
            </View>
        <ScrollView>
          
      {this.state.gridState != 'list' ?  
        dataSource ? dataSource.map((item,index) => (
            <View    
                key={index}            
                style={{
                  flex: 1,
                  //padding:10,
                  paddingHorizontal:15,
                  //margin: 10,
                  marginTop:20,
                  // flexWrap: 'wrap',
                  flexDirection: 'row'
                }}>
                <View>
                    <Storestyles.images source={item.img}/>
                    <Storestyles.CategoryLabel>{item.title}</Storestyles.CategoryLabel>
                    <Storestyles.lightTitle>{item.location}</Storestyles.lightTitle>
                </View>
            </View>
        )) : <Text>No Data Found</Text>
      :
      <FlatList
      data={dataSource}
      renderItem={({item,index}) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            //padding:10,
            paddingHorizontal:15,
            //margin: 10,
            marginTop:20
          }}>
               <View
               style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent:"center",
                  alignItems: "center",
                  borderTopWidth: 1,
                  borderColor: "#00000076",
                  paddingVertical: size(-5),
                  }}> 
                     <View style={{width:"65%"}}>
                      <Storestyles.CategoryLabel>{item.title}</Storestyles.CategoryLabel>
                      <Storestyles.lightTitle>{item.location}</Storestyles.lightTitle>
                      </View>
                      <TouchableOpacity style={{ justifyContent:"flex-end",marginLeft:size(95) }}
                                  onPress={() => this.props.navigation.navigate('StoreDetails', {"title":item.title,"subCategory":item.subCategory,"description":item.description })}>
                      <Image style={{width:size(10),height:size(15),tintColor:"#000"}}source={require("../../assets/Images/Gray_Next.png")}/>
                      </TouchableOpacity> 
                      </View>
                     </View>
                )}
          numColumns={1}
          keyExtractor={(item, index) => index}/>
      }
      
      </ScrollView>
        </Storestyles.container>
     </Storestyles.ViewArea>
        )
    }
}

export default Stores;