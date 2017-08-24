	onDeviceReady();
	function onDeviceReady(){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(iniciaDB, errorCB, successCB);
		console.log(db);
	}

	function iniciaDB(tx){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		tx.executeSql('DROP TABLE IF EXISTS Boleto');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS Boleto (idabajo integer primary key AUTOINCREMENT,idBoleto integer UNIQUE, strQr text, strBarcode text, idCli interger, idCon integer,idLocB integer,nombreHISB text,documentoHISB text,strEstado text , identComprador integer)');
		tx.executeSql('DROP TABLE IF EXISTS Ingreso');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS Ingreso (id integer primary key AUTOINCREMENT,idBoleto integer, strQr text, strBarcode text, idCli interger, idCon integer,idLocB integer,nombreHISB text,documentoHISB text,strEstado text)');
		tx.executeSql('DROP TABLE IF EXISTS Usuario');
		tx.executeSql('DROP TABLE IF EXISTS auditoria');
		tx.executeSql('DROP TABLE IF EXISTS concieto');
		tx.executeSql('DROP TABLE IF EXISTS localidad');
		// tx.executeSql('DROP TABLE IF EXISTS factura');
		// tx.executeSql('DROP TABLE IF EXISTS producto');
		tx.executeSql('CREATE TABLE IF NOT EXISTS usu_pedido (id integer primary key AUTOINCREMENT,id_cli integer ,id_pro integer , cantidad integer ,fecha text , id_fact integer)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS categoria (id integer primary key AUTOINCREMENT, nombre text,estado text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS producto (id integer primary key AUTOINCREMENT, id_cat integer , nombre text,estado text , precio text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS mesa (id integer primary key AUTOINCREMENT,nombre text, estado text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS factura (id integer primary key AUTOINCREMENT,valor text , id_servidor text , fecha text)');
		// tx.executeSql('CREATE TABLE IF NOT EXISTS localidad (id integer primary key AUTOINCREMENT,id_con integer,id_loc integer , nombre text)');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Licores" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Vinos" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Shots" , 1);');
		// tx.executeSql('INSERT INTO categoria (nombre , estado) values ("Botellas" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Whisky" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Ron" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 1 , "Vorka" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 2 , "Blanco" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 2 , "Tinto" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 3 , "Tres Reyes" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 3 , "100 fuegos" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 4 , "Entera de la Casa" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 4 , "Media de la Casa" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 5 , "Red Bull" , 1);');
		// tx.executeSql('INSERT INTO producto (id_cat , nombre , estado) values ( 5 , "V220" , 1);');
		
		
	}

	function errorCB(err){
		console.log("Error processing SQL: "+err.message);
	}

	function successCB() {
		console.log("success!");
	}
	$( document ).ready(function() {
		console.log( "ready!" );
		setTimeout(function(){
			ver_categorias(); 
		}, 1000);
		
	});
	
	function ver_categorias(){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from categoria',[],function(tx,results){
				var registro = results.rows.length;
				//alert(registro);
				var datos = '';
				var tr = '';
				
				
				for(var j = 0; j < registro; j++){
					var row1 = results.rows.item(j);
					var nombre = row1.nombre;
					var id = row1.id;
					//alert('<<>>'+ nombreL);
					
					tr +='<a href="javascript:void(0);" class="sina" ><div class="boton-gris" id="categoria_'+id+'" onclick="vemarcas('+id+')">'+nombre+'</div></a>';
					//alert(tr);
					
				}
				$('#contieneCategorias').html(tr);
				
			},errorCB,successCB);
		});
		
	}
	function vemarcas(id){
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from categoria where id = ?',[id],function(tx,results){
				var registro = results.rows.length;
				for(var j = 0; j < registro; j++){
					var row1 = results.rows.item(j);
					var nombre = row1.nombre;
					var id = row1.id;
					$('#titulo').html('Categoria : ' + nombre);
				}
			},errorCB,successCB);
		});
		
		$('.boton-gris').removeClass('celestes');
		$('#categoria_'+id).addClass('celestes');
		var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
		db.transaction(function(tx){
			tx.executeSql('SELECT * from producto where id_cat = ? ',[id],function(tx,results){
				var registro = results.rows.length;
				//alert(registro);
				if(registro > 0){
					var datos = '';
					var tr = '';
					tr += '	<div id = "productosCategoria" >\
								<table width = "100%">\
									<tbody>\
										<tr>\
											<th width ="15%">\
												Quitar\
											</th>\
											<th width ="55%" style ="text-align:center;">\
												Producto\
											</th>\
											<th width ="15%">\
												Agregar\
											</th>\
										</tr>\
									</tbody>\
								</table>\
								';
						for(var j = 0; j < registro; j++){
							var row1 = results.rows.item(j);
							var nombre = row1.nombre;
							var precio = row1.precio;
							var id_p = row1.id;
							//alert('<<>>'+ nombreL);
							tr 	+= '<div style = "padding-left:10px;text-decoration:none" href="javascript:void(0);" class="sina">\
										<div class="boton-gris" id="sel13" style ="padding:0px;" >\
											<table width = "100%" >\
												<tbody>\
													<tr>\
														<td width ="15%" style ="text-align:center;" >\
															<i onclick = "quitar('+id_p+' , '+precio+')" class="fa fa-minus-square" aria-hidden="true" style = "cursor:pointer;color:red;"></i>\
														</td>\
														<td width ="55%" style ="text-align:center;font-size:12px;">\
															<table width = "100%" align="center">\
																<tr>\
																	<td width="50%" style ="text-align:left;padding-left:5px;">\
																		'+nombre+'   <br>\
																		<span style = "color:#00a2d0;font-size:12px;" id = "precio_'+id_p+'" > UDS $ '+precio+' </span><br>\
																	</td>\
																	<td>\
																		<center>\
																			<span style = "color:#000;">Cantidad : </span><br>\
																			<input id_p = "'+id_p+'" name="menu_check[]" id="cantidadEnvio_'+id_p+'" value="0" class="form-control" type="text" style ="width:80px;text-align:center;background-color:#f6f6f6;border:none;font-size:30px;height:50px;" disabled readonly>\
																		</center>\
																		<center><input id="nombreP_'+id_p+'" value="'+nombre+'" class="form-control" type="hidden" style ="width:150px;text-align:center;"></center>\
																		<center><input id="precioP_'+id_p+'" value="'+precio+'" class="form-control" type="hidden" style ="width:150px;text-align:center;"></center>\
																	</td>\
																</tr>\
															</table>\
														</td>\
														<td width ="15%" style ="text-align:center;">\
															<i onclick = "agregar('+id_p+' , '+precio+')" class="fa fa-plus-circle" aria-hidden="true" style = "cursor:pointer;color:#1D9C73;"></i>\
														</td>\
													</tr>\
												</tbody>\
											</table>\
										</div>\
									</div>\
									';
							//alert(tr);
							
						}
						tr 	+= '<a style = "padding-left:10px;" href="javascript:void(0);" class="sina">\
									<div class="boton-gris" id="sel13">\
										<center>\
											<button id = "botonFin" type="button" class="btn btn-default" onclick = "grabarPedido()">AGREGAR PEDIDO</button><br>\
											<label id = "load"></label>\
										</center>\
									</div>\
								</a>\
							</div>\
							<div id= "mensajeCargados" style = "display:none;width:100%;height:300px;background-color:#fff;">\
								hola\
							</div>\
							';
					$('#menu').html(tr);
					$('#modal').modal('show');
				}
			},errorCB,successCB);
		});
	}
	
	function grabarPedido(){
			
		var selected = '';    
		$("input[name='menu_check[]']").each(function(){
			if ($(this).val() != 0) {
				selected += $(this).val()+', ';
			}
		}); 

		if (selected != ''){
			var id_mesa2 = $('#id_mesa').val();
			var hoy = new Date();
			var d = hoy.getDate();
			var m = hoy.getMonth();
			var a = hoy.getFullYear();
			
			var mes = '';
			if(m>=1 || m <=9){
				mes = ('0'+(m+1));
			}else{
				mes = (m+1)
			}
			
			var dia = '';
			if(d>=1 || d<=9){
				dia = ('0'+d);
			}else{
				dia = d;
			}
			var fechaA = (a)+'-'+mes+'-'+dia;
			var fecha = fechaA;
			var id_cli = 0;
			//alert(id_mesa2);
			var tr = '';
			var tr2 = '';
			
			
			
			$("input[name='menu_check[]']").each(function() {
				if ($(this).val() != 0) {
					$('#botonFin').attr('disabled',true);
					$('#load').html('Espere estamos procesando su pedido');
					var id_p = $(this).attr('id_p');
					var cantidad = $('#cantidadEnvio_'+id_p).val();
					var nombreP_ = $('#nombreP_'+id_p).val();
					var precioP_ = $('#precioP_'+id_p).val();
					//alert('productos :  '  +  id_p +  ' cantidad : '  +  cantidad + '  nombre ' + nombreP_ + ' precio : ' + precioP_);
					// var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
					// db.transaction(function(tx){
						// tx.executeSql('INSERT INTO usu_pedido (id_cli , id_pro , cantidad , fecha) VALUES (?,?,?,?);',[id_mesa2,id_p,cantidad,fecha],function(tx,results){
							
						// });
					// },errorCB,successCB);
					
					tr += '<tr class = "recorreComanda" id_p = "'+id_p+'" id = "fila_producto_'+id_p+'" >\
									<td width ="55%" style ="border:1px solid #eee;">\
										'+nombreP_+'\
										<input type = "hidden" class = "id_p" value = "'+id_p+'" />\
										<input type = "hidden" class = "nombreP_" value = "'+nombreP_+'" />\
									</td>\
									<td width ="10%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
										'+precioP_+'\
										<input type = "hidden" class = "precioP_" value = "'+precioP_+'" />\
									</td>\
									<td width ="10%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
										'+cantidad+'\
										<input type = "hidden" class = "cantidad" value = "'+cantidad+'" />\
									</td>\
									<td width ="15%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
										'+(parseFloat(precioP_) * parseFloat(cantidad)).toFixed(2)+'\
										<input type = "hidden" class = "total_" value = "'+(parseFloat(precioP_) * parseFloat(cantidad))+'" />\
									</td>\
									<td width ="15%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
										<i class="fa fa-times fa-2x" aria-hidden="true" style = "color:red;cursor:pointer;" onclick = "quitaFila('+id_p+')" ></i>\
									</td>\
								</tr>';
					
				}
			});
			
			
					
					
			$('#contieneProductosCargados').append(tr);
			
			setTimeout(function(){
				//alert('gracias su pedido a sido prosesado con éxito');
				$('#productosCategoria').css('display','none');
				$('#mensajeCargados').fadeIn('slow');
				$('#mensajeCargados').html('\
									<table style = "width:100%;height:100%;">\
										<tr><td><center>Gracias!! su pedido a sido procesado con èxito</center></td></tr>\
										<tr>\
											<td style = "width:50%;text-align:center;">\
												<i class="fa fa-book fa-5x botones_pedido" aria-hidden="true" id = "sombra1" onclick = "continua(4);"></i><br>\
												<span>VER MI PEDIDO</span></a>\
											</td>\
										</tr>\
										<tr>\
											<td style = "width:50%;text-align:center;">\
												<i class="fa fa-shopping-cart fa-5x botones_pedido" aria-hidden="true" id = "sombra2" onclick = "continua(3);"></i><br>\
												<span>SEGUIR COMPRANDO </span>\
											</td>\
										</tr>\
									</table>\
								');
				//verReporte();
			}, 2500); 
		}else{
			alert('Al menos una cantidad de este menù debe ser diferente de 0');
			return false;
		}
			

	}
	
	function quitaFila(id_p){
		$('#fila_producto_'+id_p).remove();
		saberComandas();
	}
	
	function saberComandas(){
		if ( $(".recorreComanda").length > 0 ) {
			var sumaPrecio = 0;
			var sumaCantidad = 0;
			var sumaTotal = 0;
			var tr2 = '';
			$(".recorreComanda").each(function(){
				
				var precioP_ = $(this).find('.precioP_').val();
				var cantidad = $(this).find('.cantidad').val();
				
				sumaPrecio = (parseFloat(sumaPrecio) + parseFloat(precioP_)).toFixed(2);
				sumaCantidad = (parseFloat(sumaCantidad) + parseFloat(cantidad));
				sumaTotal = (parseFloat(sumaTotal) + parseFloat(parseFloat(precioP_) * parseFloat(cantidad))).toFixed(2);				
			}); 
			tr2 += '<tr>\
						<td width ="55%" style ="border:1px solid #eee;">\
							<b style = "color:red;">TOTAL</b>\
						</td>\
						<td width ="10%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
							\
						</td>\
						<td width ="10%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
							'+sumaCantidad+'\
						</td>\
						<td width ="15%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
							'+sumaTotal+'\
							<input type = "hidden" id = "sumaTotal" value = "'+sumaTotal+'" />\
						</td>\
						<td width ="15%" style ="text-align:right;font-size:12px;border:1px solid #eee;">\
							\
						</td>\
					</tr>\
					<tr>\
						<td colspan = "5" style = "text-align:center;">\
							<table style = "width:100%;height:100%;">\
								<tr>\
									<td style = "width:50%;text-align:center;">\
										<button id = "botonFin2" type="button" class="btn btn-default botonFin2" onclick = "continua(3);" >SEGUIR COMPRANDO</button><br>\
									</td>\
									<td style = "width:50%;text-align:center;">\
										<button id = "botonFin2" type="button" class="btn btn-default botonFin2" onclick = "grabarComanda()">ENVIAR PEDIDO</button><br>\
									</td>\
								</tr>\
							</table>\
						</td>\
					</tr><tr><td colspan ="5" style ="text-align:center;"><label id = "load2"></label></td></tr>\
					';
			// alert(tr2);
			$('#contienePieCargados').html(tr2);
		}
	}
	function continua(id){
		if(id == 4){
			saberComandas();
		}
		$('#modal').modal('hide') 
		seleccionaMenu(id);
	}
	function grabarComanda(){
		var selected = '';    
		$(".recorreComanda").each(function(){
			if ($(this).attr('id_p') != 0) {
				selected += $(this).val()+', ';
			}
		}); 

		if (selected != ''){
			var id_mesa2 = 1;//$('#id_mesa').val();
			var hoy = new Date();
			var d = hoy.getDate();
			var m = hoy.getMonth();
			var a = hoy.getFullYear();
			
			var mes = '';
			if(m>=1 || m <=9){
				mes = ('0'+(m+1));
			}else{
				mes = (m+1)
			}
			// alert(d);
			var dia = '';
			if(d>=1 || d<=9){
				dia = d;
			}else{
				dia = d;
			}
			var fechaA = (a)+'-'+mes+'-'+dia;
			var fecha = fechaA;
			var id_cli = 0;
			//alert(id_mesa2);
			var tr = '';
			
			var sumaPrecio = 0;
			var sumaCantidad = 0;
			var sumaTotal = $('#sumaTotal').val();
			
			var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
			db.transaction(function(tx){
				tx.executeSql('INSERT INTO factura (valor , fecha) VALUES (?,?);',[sumaTotal,fecha],function(tx,results){
					
				});
			},errorCB,successCB);
			
			var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
			db.transaction(function(tx){
				tx.executeSql('select max(id) as id_fact from factura order by id desc',[],function(tx,results){
					var registro = results.rows.length;
					
					for(var j = 0; j < registro; j++){
						var row1 = results.rows.item(j);
						var id_factura = row1.id_fact;
						// alert(registro + ' <<>> ' + id_factura);
						$('#id_factura').val(id_factura);
						$('#numero_de_orden').html(id_factura);
					}
				},errorCB,successCB);
			});
			$('.botonFin2').attr('disabled',true);
			$('#load2').html('Espere estamos procesando su pedido');
			// alert(id_factura);
			setTimeout(function(){
				$(".recorreComanda").each(function() {
					if ($(this).attr('id_p') != 0) {
						var id_p = $(this).attr('id_p');
						
						var id_p = $(this).find('.id_p').val();
						var cantidad = $(this).find('.cantidad').val();
						var id_factura = $('#id_factura').val();
						console.log(id_factura);
						var db = window.openDatabase("Database", "1.0", "TicketMobile", 200000);
						db.transaction(function(tx){
							tx.executeSql('INSERT INTO usu_pedido (id_cli , id_pro , cantidad , fecha , id_fact) VALUES (?,?,?,?,?);',[id_mesa2,id_p,cantidad,fecha,id_factura],function(tx,results){
								
							});
						},errorCB,successCB);
					}
				});
			}, 2000); 
			setTimeout(function(){
				$('#tablaConsumos').css('display','none');
				$('#contieneMensajeFinal').show('fade',500);
				$('#mensajeFinal').show('fade',500);
				$('#modal').modal('hide');
				$('#contieneProductosCargados').html('');
				$('#contienePieCargados').html('');
			}, 3000); 
			
			setTimeout(function(){
				// seleccionaMenu(2);
			}, 6000); 
		}else{
			alert('Al menos una cantidad de este menù debe ser diferente de 0');
			return false;
		}
	}
	
	
	function agregar(id , precio){
		$('#cantidadEnvio_'+id).val(parseInt($('#cantidadEnvio_'+id).val()) + 1);
		var cantidadEnvio_ = $('#cantidadEnvio_'+id).val();
		var precio_ = (parseFloat(cantidadEnvio_) * parseFloat(precio)).toFixed(2);
		$('#precio_'+id).html(' UDS $ ' + precio_);
	}
	function quitar(id , precio){
		if ($('#cantidadEnvio_'+id).val() != 0);
		$('#cantidadEnvio_'+id).val(parseInt($('#cantidadEnvio_'+id).val()) - 1);
		if ($('#cantidadEnvio_'+id).val() <= 0){
			$('#cantidadEnvio_'+id).val(0);
			$('#precio_'+id).html(' UDS $ ' + precio);
		}else{
			var cantidadEnvio_ = $('#cantidadEnvio_'+id).val();
			var precio_ = (parseFloat(cantidadEnvio_) * parseFloat(precio)).toFixed(2);
			$('#precio_'+id).html(' UDS $ ' + precio_);
		}
		
		
	}
	 
	function verProducto(id){
		//alert(id);
	}
