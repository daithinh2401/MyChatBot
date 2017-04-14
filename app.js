var restify = require('restify');
var builder = require('botbuilder');
require('dotenv-extended').load();

var tainghe,sac,cap,s7,asus,sacNhanh,sacThuong,sacDung,sacNam,cap1m,cap15m,denLed;

var image_S7 = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17883509_423727774659769_1572681865005318283_n.jpg?oh=8ab135f3cf641b033d129427e86a9b07&oe=599730D9";
var link_S7 = "https://www.facebook.com/PhukienDHA9x/photos/a.423728141326399.1073741834.400899176942629/423727774659769/?type=3&theater";
var image_asus = "http://cache.media.techz.vn/upload/2014/04/26/image-1398519198-zenfone_5_detail_r_15.jpg";
var link_asus = "https://www.facebook.com/PhukienDHA9x/?fref=ts";

var image_sacNhanh = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t31.0-8/p960x960/17880038_423727724659774_6239809033327405377_o.jpg?oh=f97cb3732b78c8fef9001d56e23e6473&oe=5950A328";
var link_sacNhanh = "https://www.facebook.com/PhukienDHA9x/photos/pcb.423728131326400/423727724659774/?type=3&theater";
var image_sacThuong = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17757551_423727671326446_4862914339038198930_n.jpg?oh=99b9044dbafce96a8096146a77647da8&oe=5958D76D";
var link_sacThuong = "https://www.facebook.com/PhukienDHA9x/photos/pcb.423728131326400/423727671326446/?type=3&theater";

var image_sacDung = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17308792_409742706058276_2873401828533369507_n.jpg?oh=081cfaa1dbee216ba1cac0bc3f44af84&oe=598268D5";
var link_sacDung = "https://www.facebook.com/PhukienDHA9x/photos/a.409731216059425.1073741833.400899176942629/409742706058276/?type=3&theater";
var image_sacNam = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17342711_409743476058199_6411760939594285484_n.jpg?oh=ce14ba00b4c874fe9e1c1a5a9e4317a7&oe=59922B5A";
var link_sacNam = "https://www.facebook.com/PhukienDHA9x/photos/a.409731216059425.1073741833.400899176942629/409743476058199/?type=3&theater";

var image_cap1m = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17883969_423727827993097_8555278748704473682_n.jpg?oh=965e527e879531da935db9018dc66971&oe=59577F6E";
var link_cap1m = "https://www.facebook.com/PhukienDHA9x/photos/pcb.423728131326400/423727827993097/?type=3&theater";
var image_cap15m = "https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/17904003_423727874659759_3180006764462166813_n.jpg?oh=9bb911d77c1c572a139be362677877d1&oe=59887A87";
var link_cap15m = "https://www.facebook.com/PhukienDHA9x/photos/pcb.423728131326400/423727874659759/?type=3&theater";

var image_denLed = "http://mytholaptop.vn/uploads/html/images/0915793den_led_usb_sieu_sang_sieu_ben_1m4g3_82e56a_simg_d0daf0_800x1200_max.jpg";
var link_denLed = "https://www.facebook.com/PhukienDHA9x/";

var card_s7,card_asus,card_sacDung,card_sacNam,card_sacNhanh,card_sacThuong,card_cap1m,card_cap15m,card_denLed,number;

function taoCard(session){
	card_s7 = createHeroCard(session , 'Tai nghe Samsung S7 chính hãng....Liên hệ : 01208510764' , image_S7 , link_S7);
	card_asus = createHeroCard(session , 'Tai nghe Asus chính hãng... Liên hệ : 01208510764' , image_asus , link_asus);;
	card_sacDung = createHeroCard(session , 'Sạc không dây Samsung S7 ...Liên hệ : 01208510764' , image_sacDung , link_sacDung);
	card_sacNam = createHeroCard(session , 'Sạc không dây Samsung S6 ... Liên hệ : 01208510764' , image_sacNam , link_sacNam);
	card_sacNhanh = createHeroCard(session , 'Sạc nhanh Samsung chuẩn CE ... Liên hệ : 01208510764' , image_sacNhanh , link_sacNhanh);
	card_sacThuong = createHeroCard(session , 'Sạc Samsung 5V 2A chuẩn CE ... Liên hệ : 01208510764' , image_sacThuong , link_sacThuong);
	card_cap1m = createHeroCard(session , 'Cáp USB chính hãng dài 1m ... Liên hệ : 01208510764' , image_cap1m , link_cap1m);
	card_cap15m = createHeroCard(session , 'Cáp USB chính hãng dài 1,5m ... Liên hệ : 01208510764' , image_cap15m , link_cap15m);
	card_denLed= createHeroCard(session , 'Đèn LED USB bảo hành 6 tháng , giá 20k... Liên hệ : 01208510764' , image_denLed , link_denLed);
}

function taobienentity(args){
	
	tainghe =  builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe');
	sac =  builder.EntityRecognizer.findEntity(args.entities, 'Sạc');
	cap =  builder.EntityRecognizer.findEntity(args.entities, 'Cáp');
	
	s7 = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe::Tai nghe Samsung S7');	
	asus = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe::Tai nghe Asus');
	sacNhanh = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc nhanh chuẩn CE');
	sacThuong = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc 5V 2A chuẩn CE');
	sacDung = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc đứng không dây SS');
	sacNam = builder.EntityRecognizer.findEntity(args.entities, 'Sạc::Sạc nằm không dây SS');
	cap1m = builder.EntityRecognizer.findEntity(args.entities, 'Cáp::Cáp 1m chuẩn CE');
	cap15m = builder.EntityRecognizer.findEntity(args.entities, 'Cáp::Cáp 1,5m chuẩn CE');
	denLed = builder.EntityRecognizer.findEntity(args.entities, 'Đèn LED USB');
	
	number = builder.EntityRecognizer.findEntity(args.entities , 'builtin.number');

}

var tenNguoiDat = '';
var sdt = '';


//=========================================================
// Bot Setup
//=========================================================
 
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

const APPID = "f7fa8691-b494-4f6f-b395-e2f8d41bc9e8";
const APPKEY = "CZNmqLtj4oTvPwRb8BZQQbt";

 
// Create chat bot
var connector = new builder.ChatConnector({
    appId: APPID,
    appPassword: APPKEY
});
var bot = new builder.UniversalBot(connector);



var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/927a07ad-21ce-43f8-9044-776d720a5e8e?subscription-key=c5940b22af1c4c6ea4347c211b72036c&verbose=true&timezoneOffset=0.0&q='
var recognizer = new builder.LuisRecognizer(model);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });


server.post('/', connector.listen());

//

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/' , intent);


/*bot.on('conversationUpdate' , function(session){	
	session.endDialog('Chào mừng bạn đã đến với Shop - Phụ kiện điện thoại DHA , tôi là Bot trả lời tự động. Hãy nhập sản phẩm bạn cần , tôi sẽ trả lời cho bạn...... Gợi ý : nhập  " tên sản phẩm " để biết giá, nhập " tư vấn + tên sản phẩm " để nhận thông tin về sản phẩm , nhập "Help" để được trợ giúp ');
});*/


function getCardGroup_TaiNghe(session){
	return [card_s7,card_asus];
}
function getCardGroup_Sac(session){
	return [card_sacDung,card_sacNam,card_sacNhanh,card_sacThuong];
}
function getCardGroup_Cap(session){
	return [card_cap1m,card_cap15m];
}


intent.matches('ProductInfo' ,
	function (session, args, next) {
		
		taobienentity(args);
		taoCard(session);
		
		var bh = builder.EntityRecognizer.findEntity(args.entities , 'Bảo hành');
		var loi =  builder.EntityRecognizer.findEntity(args.entities , 'Lỗi');
		
		if(bh){
			session.send('Tất cả sản phẩm của Shop đều được bảo hành 6 tháng kể từ ngày mua, thông tin địa chỉ bạn xem trên Trang của Shop nhé ^^');
		}
		
		else if(loi){
			session.send('Mọi sản phẩm khi bị lỗi đều được 1 đổi 1 trong vòng 7 ngày sau khi mua, nếu qua thời hạn đổi, bạn vẫn có thể đem sản phẩm tới Shop để bảo hành nếu có lỗi trong vòng 6 tháng, Shop cố gắng hỗ trợ bạn thật tốt ^^');
		}
		
		else if(tainghe){
			var cards = getCardGroup_TaiNghe();
			var reply = new builder.Message(session)
							.attachmentLayout(builder.AttachmentLayout.carousel)
							.attachments(cards);

			session.send(reply);
			session.send('Shop mình đang kinh doanh 2 loại tai nghe chính hãng Samsung và Asus, hiện tại tai nghe Asus đang hết hàng, bạn thông cảm nhé ^^');
		}
		
		else if(sac){
			var cards = getCardGroup_Sac();
			var reply = new builder.Message(session)
							.attachmentLayout(builder.AttachmentLayout.carousel)
							.attachments(cards);

			session.send(reply);
			session.send('Các loại Sạc Shop mình đang kinh doanh , mời bạn ủng hộ nhé ^^');
		}
		
		else if(cap){
			var cards = getCardGroup_Cap();
			var reply = new builder.Message(session)
							.attachmentLayout(builder.AttachmentLayout.carousel)
							.attachments(cards);

			session.send(reply);
			session.send('Shop mình hiện có 2 loại Cáp chiều dài 1m và 1,5m , mời bạn ủng hộ nhé ^^');
		}
		
		else if(s7){		
			var msg = new builder.Message(session).addAttachment(card_s7);
			session.endDialog(msg);
			session.send('Tai nghe Samsung S7 chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(asus){		
			var msg = new builder.Message(session).addAttachment(card_asus);
			session.endDialog(msg);
			session.send('Tai nghe Asus chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 100k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
			session.send('Hiện tại sản phẩm Tai nghe Asus đang hết hàng, mong bạn thông cảm ^^');
		}
		
		else if(sacDung){
			var msg = new builder.Message(session).addAttachment(card_sacDung);
			session.endDialog(msg);
			session.send('Sạc không dây Samsung S6 chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 690k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(sacNam){
			var msg = new builder.Message(session).addAttachment(card_sacNam);
			session.endDialog(msg);
			session.send('Sạc không dây S7 chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 390k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(sacNhanh){
			var msg = new builder.Message(session).addAttachment(card_sacNhanh);
			session.endDialog(msg);
			session.send('Củ sạc nhanh Samsung chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(sacThuong){	
			var msg = new builder.Message(session).addAttachment(card_sacThuong);
			session.endDialog(msg);
			session.send('Củ sạc 5V 2A Samsung chính hãng, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(cap1m){
			var msg = new builder.Message(session).addAttachment(card_cap1m);
			session.endDialog(msg);
			session.send('Dây cáp Samsung 1m, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(cap15m){
			var msg = new builder.Message(session).addAttachment(card_cap15m);
			session.endDialog(msg);
			session.send('Dây cáp Samsung 1,5m, bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else if(denLed){		
			var msg = new builder.Message(session).addAttachment(card_denLed);
			session.endDialog(msg);
			session.send('Đèn LED USB,  bảo hành 6 tháng, 1 đổi 1 nếu có lỗi, giá bán lẻ 120k... Nếu cần mua sỉ vui lòng liên hệ trực tiếp SĐT hoặc để lại lời nhắn ^^');
		}
		
		else
			session.endDialog('Bot không hiểu hoặc chúng tôi chưa có sản phẩm này, vui lòng ghi rõ tên sản phẩm, để được trợ giúp , vui lòng nhập "Help" !');
	}
);





intent.matches('ProductCost' ,[

function (session, args, next) {
		
	
		taobienentity(args);
		
		
		if(tainghe && !s7 && !asus){
			session.dialogData.searchType = 'tainghe';
			next({ response: tainghe.entity });
		}
		
		else if(sac && !sacDung && !sacNam && !sacNhanh && !sacThuong){
			session.dialogData.searchType = 'sac';
			next({ response: sac.entity });
		}
		
		else if(cap && !cap1m && !cap15m ){
			session.dialogData.searchType = 'cap';
			next({ response: cap.entity });
		}
		
		else if(s7){
			session.dialogData.searchType = 'tai s7';
			next({ response: s7.entity });
		}
		
		else if(asus){
			session.dialogData.searchType = 'asus';
			next({ response: asus.entity });
		}
		
		else if(sacDung){
			session.dialogData.searchType = 'sacDung';
			next({ response: sacDung.entity });
		}
		
		else if(sacNam){
			session.dialogData.searchType = 'sacNam';
			next({ response: sacNam.entity });
		}
		
		else if(sacNhanh){
			session.dialogData.searchType = 'sacNhanh';
			next({ response: sacNhanh.entity });
		}
		
		else if(sacThuong){
			session.dialogData.searchType = 'sacThuong';
			next({ response: sacThuong.entity });
		}
		
		else if(cap1m){
			session.dialogData.searchType = 'cap1m';
			next({ response: cap1m.entity });
		}
		
		else if(cap15m){
			session.dialogData.searchType = 'cap15m';
			next({ response: cap15m.entity });
		}
		
		else if(denLed){
			session.endDialog('Đèn LED USB chính hãng giá : 20k');
		}
		
		else
			session.endDialog('Bot không hiểu hoặc chúng tôi chưa có sản phẩm này, vui lòng ghi rõ tên sản phẩm, để được trợ giúp , vui lòng nhập "Help" !');
			

},
	function (session, results) {
        var destination = results.response;

        var message = '';
		
		if ( session.dialogData.searchType === 'tainghe' ){
			builder.Prompts.choice(session , 'Bạn cần loại Tai nghe nào ? Chúng tôi có 2 loại : ' , [DialogLabels.Tais7 , DialogLabels.Taiasus , DialogLabels.Ketthuc]);
		}

		else if ( session.dialogData.searchType === 'sac' ){
			builder.Prompts.choice(session , 'Bạn cần loại Sạc nào ? Chúng tôi có 4 loại : ' , [DialogLabels.Sacdung , DialogLabels.Sacnam , DialogLabels.Sacnhanh ,DialogLabels.Sacthuong , DialogLabels.Ketthuc ]);
		}

		else if ( session.dialogData.searchType === 'cap' ) {
			builder.Prompts.choice(session , 'Bạn cần loại Cáp nào ? Chúng tôi có 2 loại : ' , [DialogLabels.Cap1m , DialogLabels.Cap15 , DialogLabels.Ketthuc]);
		}

        else if ( session.dialogData.searchType === 'tai s7' ){
			 message += ' Tai nghe Samsung S7 chính hãng giá bán lẻ : 120k , ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}

		else if ( session.dialogData.searchType === 'tai asus' ) {
			message += ' Tai nghe Asus chính hãng giá : 100k , ( tình trạng : hết hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'sacDung' ) {
			message += ' Sạc đứng không dây Samsung chính hãng giá : 690k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'sacNam' ) {
			message += ' Sạc nằm không dây Samsung chính hãng giá : 390k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'sacNhanh' ) {
			message += ' Sạc nhanh chuẩn CE chính hãng giá : 120k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'sacThuong' ) {
			message += ' Sạc 5V 2A chuẩn CE chính hãng giá : 80k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'cap1m' ) {
			message += ' Dây cáp 1m chính hãng giá : 50k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else if ( session.dialogData.searchType === 'cap15m' ) {
			message += ' Dây cáp 1,5m chính hãng giá : 60k, ( tình trạng : còn hàng ) , vui lòng liên hệ Shop để trao đổi giá sỉ nếu bạn cần ^^';
		}
		
		else 
			message += 'Bot không hiểu hoặc chúng tôi chưa có sản phẩm này, vui lòng ghi rõ tên sản phẩm, để được trợ giúp , vui lòng nhập "Help" !';

        session.send(message , destination);
	},
	function (session,results){
		duaraluachon(session,results);
	}
]);



intent.matches('Greetings' , function (session){
	session.send('Chào bạn đến với Shop - Phụ kiện điện thoại DHA , tôi là Bot tự động trả lời, bạn cần hỏi về sản phẩm nào ? Tôi sẽ trả lời bạn, trường hợp những câu tôi không thể giải đáp thì Nhân viên sẽ liên hệ với bạn lại sớm nhất có thể !');
});
intent.matches('Bye' , function (session){
	session.send('Cám ơn bạn đã ủng hộ !');
});

intent.matches('None' , function (session , args){
		session.send('Bot tạm thời chưa thể trả lời câu này !');
});


var DialogLabels = {
    Tainghe: 'Tai nghe',
    Sac: 'Sạc',
    Cap: 'Cáp',
	Denled: 'Đèn LED USB',
	Tais7: 'Tai nghe Samsung S7',
	Taiasus: 'Tai nghe Asus',
	Sacnhanh: 'Sạc nhanh chuẩn CE',
	Sacthuong: 'Sạc 5V 2A chuẩn CE',
	Sacnam: 'Sạc nằm không dây SS',
	Sacdung: 'Sạc đứng không dây SS',
	Cap1m: 'Cáp 1m chuẩn CE',
	Cap15: 'Cáp 1,5m chuẩn CE',
	Ketthuc: 'Kết thúc'
	
};

intent.matches('Help', [function (session) {        
		builder.Prompts.choice(session, 'Bạn cần thông tin về sản phẩm nào ? ( Vui lòng nhập đúng hoặc chọn theo số thứ tự ) ', 
		[DialogLabels.Tainghe , DialogLabels.Sac , DialogLabels.Cap , DialogLabels.Denled , DialogLabels.Ketthuc],
		{
                maxRetries: 4,
                retryPrompt: 'Not a valid option'
        }
		);
    },
	function (session, results) {
		
			var luachon_1 = results.response.entity;
			
			if(luachon_1 == DialogLabels.Tainghe){		
				builder.Prompts.choice(session, 'Các loại tai nghe hiện có , hãy chọn 1 cái : ', [DialogLabels.Tais7, DialogLabels.Taiasus, DialogLabels.Ketthuc]);
			}
			else if(luachon_1 == DialogLabels.Sac){
				builder.Prompts.choice(session, 'Các loại sạc hiện có , hãy chọn 1 cái : ', [DialogLabels.Sacnhanh, DialogLabels.Sacthuong, DialogLabels.Sacnam , DialogLabels.Sacdung, DialogLabels.Ketthuc]);	
			}
			else if(luachon_1 == DialogLabels.Cap){
				builder.Prompts.choice(session, 'Các loại cáp hiện có , hãy chọn 1 cái : ', [DialogLabels.Cap1m, DialogLabels.Cap15, DialogLabels.Ketthuc]);
			}
			else if(luachon_1 == DialogLabels.Denled){
				session.endDialog( luachon_1 + ' giá : 20k');	
			}
			
			else if(luachon_1 == DialogLabels.Ketthuc){
				session.endDialog('Bạn cần giúp gì nữa không ?');
			}
			else
				session.endDialog('Chúng tôi chưa có sản phẩm này, vui lòng kiểm tra lại đã nhập chính xác chưa , nhập "help" để được trợ giúp ');
				
		
	},

	function (session, results) {
		duaraluachon(session , results);
	}
	]);

function duaraluachon(session , results){
	var luachon_case = results.response.entity;
					
			if( luachon_case == DialogLabels.Tais7){
						session.endDialog( luachon_case + ' chính hãng giá : 120k');
			}
			
			
			else if( luachon_case == DialogLabels.Taiasus){
						session.endDialog( luachon_case + ' chính hãng giá : 100k');
			}
			
			
			else if( luachon_case == DialogLabels.Sacnhanh){
						session.endDialog( luachon_case + ' chính hãng giá : 120k');
			}
			
			
			else if( luachon_case == DialogLabels.Sacthuong){
						session.endDialog( luachon_case + ' chính hãng giá : 80k');
			}
			
			
			else if( luachon_case == DialogLabels.Sacnam){
						session.endDialog( luachon_case + ' chính hãng giá : 390k');
			}
			
			
			else if( luachon_case == DialogLabels.Sacdung){
						session.endDialog( luachon_case + ' chính hãng giá : 690k');
			}
					
			else if( luachon_case == DialogLabels.Cap1m){
						session.endDialog( luachon_case1 + ' chính hãng giá : 50k');
			}
			
			
			else if( luachon_case == DialogLabels.Cap15){
						session.endDialog( luachon_case1 + ' chính hãng giá : 60k');
			}		
			
			else if( luachon_case == DialogLabels.Ketthuc)
						session.endDialog('Bạn cần giúp gì nữa không ?');
					
			else
						session.endDialog('Chúng tôi chưa có sản phẩm này, vui lòng kiểm tra lại đã nhập chính xác chưa , nhập "help" để được trợ giúp ');
									
	}
	
	
	
function createReceiptCard(session , tenNguoiDat , sdt, tenSp, giaSp , soluong , img) {
    return new builder.ReceiptCard(session)
        .title(tenNguoiDat)
        .facts([
            builder.Fact.create(session, sdt , 'Điện thoại : '),
            builder.Fact.create(session, 'Thanh toán khi nhận hàng', 'Hình thức : '),
			builder.Fact.create(session, 'Giá', 'Tên sản phẩm'),
        ])
        .items([
            builder.ReceiptItem.create(session, giaSp , soluong , tenSp)
				.quantity(soluong)
                .image(builder.CardImage.create(session, img))
        ])
        .total(giaSp * soluong);
}


intent.matches('SignUp' , [
	function(session)
	{
		builder.Prompts.text(session , 'Bạn vui lòng cho Shop biết tên của bạn nhé ^^');
	},
	function(session , results)
	{
		tenNguoiDat = results.response;
		builder.Prompts.text(session , 'Xin chào ' + results.response + ' , cho mình xin sđt để liên hệ nhé ^^');
	},
	function(session , results)
	{
		sdt = results.response;
		session.endDialog('Xong rồi , bây giờ bạn có thể đặt hàng dựa trên thông tin bạn đã nhập , sau đó Shop sẽ liên hệ lại nhé.');
	}]
);
	
intent.matches('Order' , [

	function(session ,args){
		taobienentity(args);
		
		if(tenNguoiDat == '' && sdt == '')
		{
			session.endDialog('Vui lòng cho biết thông tin của bạn trước khi đặt hàng bằng cách nhập : "Đăng kí"');
		}
		else
		{
			if(number && s7)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Tai nghe Samsung S7' , 120 , number.entity , image_S7 );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && asus)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Tai nghe Asus' , 100 , number.entity , image_asus );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);		
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && sacDung)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Sạc không dây S7/S7 Edge' , 690 , number.entity , image_sacDung );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');				
			}
			else if(number && sacNam)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Sạc không dây S6/S6 Edge' , 390 , number.entity , image_sacNam );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);	
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && sacNhanh)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Sạc nhanh chuẩn CE' , 120 , number.entity , image_sacNhanh );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && sacThuong)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Sạc 5V 2A chuẩn CE' , 80 , number.entity , image_sacThuong );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && cap1m)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Cáp USB Samsung 1m' , 50 , number.entity , image_cap1m );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && cap15m)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Cáp USB Samsung 1,5m' , 60 , number.entity , image_cap15m );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else if(number && denLed)
			{
				var orderCard = createReceiptCard(session , tenNguoiDat , sdt , 'Đèn LED USB' , 20 , number.entity , image_denLed );
				var msg = new builder.Message(session).addAttachment(orderCard);
				session.send(msg);
				builder.Prompts.text(session , 'Vui lòng xem lại bảng đặt hàng và xác nhận bằng cách gõ bất kì , nếu có sai sót hoặc muốn hủy , vui lòng nhập "Hủy"');
			}
			else
			{
				session.endDialog('Bạn vui lòng nhập đúng số lượng và tên sản phẩm nhé !');
			}
					
		}
	},
	function(session , results)
	{
		if(results.response == 'Hủy' || results.response == 'HỦY' || results.response == 'hủy')
		{
			session.endDialog('Đã hủy đặt hàng , bạn có thể đặt lại bất cứ lúc nào ^^');
		}
		else
		{
			session.endDialog('Hoàn tất đặt hàng , Nhân viên sẽ liên hệ lại với bạn để xác nhận lần cuối, cám ơn đã ủng hộ Shop nhé ^^');
		}
	}]
);





function giaSp(lc)
{
	if(lc == DialogLabels.s7)
		return 120;
	if(lc == DialogLabels.asus)
		return 100;
	if(lc == DialogLabels.sacDung)
		return 690;
	if(lc == DialogLabels.sacNam)
		return 390;
	if(lc == DialogLabels.sacNhanh)
		return 120;
	if(lc == DialogLabels.sacThuong)
		return 80;
	if(lc == DialogLabels.cap1m)
		return 50;
	if(lc == DialogLabels.cap15m)
		return 60;
	if(lc == DialogLabels.denLed)
		return 20;
}

function imageSp(lc)
{
	if(lc == DialogLabels.s7)
		return image_S7;
	if(lc == DialogLabels.asus)
		return image_asus;
	if(lc == DialogLabels.sacDung)
		return image_sacDung;
	if(lc == DialogLabels.sacNam)
		return image_sacNam;
	if(lc == DialogLabels.sacNhanh)
		return image_sacNhanh;
	if(lc == DialogLabels.sacThuong)
		return image_sacThuong;
	if(lc == DialogLabels.cap1m)
		return image_cap1m;
	if(lc == DialogLabels.cap15m)
		return image_cap15m;
	if(lc == DialogLabels.denLed)
		return image_denLed;
}
	
	
function createHeroCard(session , message , image , url ) {
    return new builder.HeroCard(session)
        .title('Shop - Phụ kiện điện thoại DHA')
        .text(message)
        .images([
            builder.CardImage.create(session, image)
        ])
        .buttons([
            builder.CardAction.openUrl(session, url)
        ]);
}

