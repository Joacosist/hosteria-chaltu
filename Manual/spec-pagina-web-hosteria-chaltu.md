# Spec: Página web — Hostería Chaltu

Documento de referencia para que Claude Code construya la página. Contiene el contenido real del hotel, la identidad de marca y los requisitos técnicos. Todo lo marcado como **[CONFIRMAR]** es un supuesto mío que conviene validar con Joaquin antes de darlo por cerrado.

## 1. Resumen del proyecto

Página web informativa de Hostería Chaltu (Villa Gesell Norte, Buenos Aires, Argentina). **No** tiene motor de reservas propio: la conversión se resuelve derivando al visitante a WhatsApp, Booking.com o TripAdvisor. El sitio debe reflejar la nueva identidad de marca "Chaltu" (ver sección 5), no el diseño del sitio actual (hosteriachaltu.com.ar), que queda solo como fuente de datos.

**Referencia de layout/estructura:** hotelprincemdp.com.ar y hoteldenver.com.ar (hoteles de Mar del Plata) — secciones tipo hero, habitaciones, servicios, galería, ubicación, contacto, botón flotante de WhatsApp.

## 2. Alcance

**Incluye:**
- Landing de una sola página (scroll) con navegación por anclas
- Selector de idioma: Español / English / Português
- Botón flotante de WhatsApp (persistente en todas las secciones)
- Links directos a Booking.com y TripAdvisor
- Galería de fotos propias del hotel
- Mapa de ubicación embebido
- Formulario de contacto opcional **[CONFIRMAR: ¿lo quiere, o solo WhatsApp/mail/teléfono como vía de contacto?]** — por defecto, no lo incluyo y dejo solo los datos de contacto directos.

**No incluye (fuera de alcance):**
- Motor de reservas / pasarela de pago
- Sección de tarifas/precios (los precios se consultan por WhatsApp o se ven en Booking)
- Backend, base de datos o panel de administración
- Blog o sección de noticias

## 3. Stack técnico recomendado

HTML5 + CSS3 + JavaScript vanilla, sin framework ni build step. Es la opción más simple de mantener y de subir a cualquier hosting (incluido el que ya usan). Mobile-first: la mayoría de las visitas van a ser desde el celular.

- Un solo `index.html` (o estructura simple por secciones si Claude Code lo prefiere)
- CSS con variables (`:root`) para la paleta de marca — así los colores se cambian en un solo lugar
- JS vanilla solo para: menú mobile, selector de idioma (mostrar/ocultar bloques de texto por idioma, sin recargar la página), scroll suave a las anclas, y lightbox simple para la galería
- Imágenes con `loading="lazy"` y tamaños optimizados (varias resoluciones o `srcset` si el volumen de fotos lo justifica)
- Meta tags de SEO (title, description) y Open Graph (para que se vea bien al compartir el link en WhatsApp/redes) usando la foto del hero y la descripción de la sección 6.1
- Favicon en base al monograma "CH" del logo

## 4. Estructura de la página (single-page, en este orden)

1. **Header/Nav fijo**: logo, links ancla (Inicio, Habitaciones, Servicios, Galería, Ubicación, Contacto), selector de idioma, botón WhatsApp destacado (número: ver sección 6.5)
2. **Hero**: foto full-bleed del hotel, tagline de marca, subtítulo, dos CTAs (WhatsApp / Ver en Booking)
3. **Sobre Chaltu**: descripción del lugar
4. **Habitaciones**: tipos, capacidad, equipamiento
5. **Servicios y amenities**: grilla con íconos
6. **Galería**: grid de fotos propias, con lightbox
7. **Reseñas / Reservá**: certificado de excelencia TripAdvisor + botones grandes a Booking y TripAdvisor (esta sección reemplaza al motor de reservas, tiene que ser muy visible)
8. **Ubicación**: dirección, mapa embebido, referencias (mar, centro)
9. **Contacto / Footer**: teléfono, WhatsApp, email, dirección, redes sociales, links a Booking/TripAdvisor otra vez, copyright
10. **Botón flotante de WhatsApp**: visible en todo momento, en las tres secciones de scroll

## 5. Identidad de marca

Manual visual completo adjunto en `referencias/manual-visual-chaltu.png` — usarlo como referencia visual además de los datos exactos de abajo.

**Nombre y logo:** "HOSTERÍA CHALTU" (wordmark) + "VILLA GESELL NORTE" (subtítulo) + ilustración de sol/colinas/mar + monograma circular "CH" con el texto "NATURALEZA · DESCANSO · CALIDEZ" alrededor.

**Tagline:** "Naturaleza que abraza. Descanso que queda."

**Descripción de marca:** "Chaltu es un refugio en Villa Gesell Norte. Un lugar donde la naturaleza, la calidez y el buen descanso se encuentran para que cada huésped pueda bajar el ritmo y volver a lo esencial."

### Paleta de colores

| Nombre | Hex | Uso |
|---|---|---|
| Crema | `#F4F0E7` | Neutro, fondo principal (70%) |
| Marfil | `#FAF7F2` | Neutro, fondo secundario (70%) |
| Verde Bosque | `#2F3E35` | Verde, texto/header oscuro (20%) |
| Verde Hoja | `#7C8F6A` | Verde, acentos (20%) |
| Marrón Tierra | `#8B6B4C` | Marrón, acentos (10%) |
| Madera | `#C9A27D` | Marrón, acentos/CTA (10%) |

### Tipografías

- **Títulos y frases (H1):** Cormorant Garamond, Regular/Medium, mayúsculas, tracking amplio
- **Subtítulos (H2):** Lora Semibold, mayúsculas, tracking amplio
- **Texto de cuerpo y datos:** Lora Regular, interlineado 140%
- **Botones/CTAs:** Lora Semibold, mayúsculas

Ambas están en Google Fonts, se pueden importar directo.

### Estilo gráfico

Ilustraciones botánicas simples (ramas, hojas), íconos lineales para servicios, texturas naturales (madera, lino). Fotografía con luz natural y cálida, tonos suaves y terrosos, composiciones simples que transmitan calma. Evitar colores saturados o fríos que rompan la paleta.

## 6. Contenido (copy)

Todo el copy base está en español. Para inglés y portugués, traducir manteniendo el mismo tono cálido y cercano — abajo dejo el nav y el hero traducidos como referencia de tono; el resto de los textos largos (descripción, servicios) se traducen siguiendo esa misma línea.

### 6.1. Hero / Sobre Chaltu

**ES:**
- Tagline: "Naturaleza que abraza. Descanso que queda."
- Descripción: "Chaltu es un refugio en Villa Gesell Norte. Un lugar donde la naturaleza, la calidez y el buen descanso se encuentran para que cada huésped pueda bajar el ritmo y volver a lo esencial. Emplazada en un entorno de bosque a solo 120 metros del mar, con playas de más de 200 metros de arena limpia, a 10 cuadras del centro comercial."

**EN:**
- Tagline: "Nature that embraces. Rest that stays."
- Description: "Chaltu is a retreat in northern Villa Gesell. A place where nature, warmth and true rest come together, so every guest can slow down and return to what matters. Set in a forest environment just 120 meters from the sea, with over 200 meters of clean sand beach, 10 blocks from downtown."

**PT:**
- Tagline: "Natureza que abraça. Descanso que permanece."
- Descrição: "Chaltu é um refúgio no norte de Villa Gesell. Um lugar onde a natureza, a calidez e o verdadeiro descanso se encontram, para que cada hóspede possa desacelerar e voltar ao essencial. Situada em um ambiente de bosque a apenas 120 metros do mar, com praias de mais de 200 metros de areia limpa, a 10 quadras do centro comercial."

### 6.2. Navegación / CTAs

| | ES | EN | PT |
|---|---|---|---|
| Nav | Inicio, Habitaciones, Servicios, Galería, Ubicación, Contacto | Home, Rooms, Amenities, Gallery, Location, Contact | Início, Quartos, Serviços, Galeria, Localização, Contato |
| CTA WhatsApp | Escribinos por WhatsApp | Message us on WhatsApp | Fale conosco pelo WhatsApp |
| CTA Booking | Reservar en Booking.com | Book on Booking.com | Reserve no Booking.com |
| CTA TripAdvisor | Ver reseñas en TripAdvisor | See reviews on TripAdvisor | Veja avaliações no TripAdvisor |

### 6.3. Habitaciones

17 habitaciones amplias, con capacidad para 2 a 3 personas. Todas incluyen cochera individual descubierta (a 80 mts de la hostería, con cámaras de seguridad).

- **Habitación doble matrimonial** — cama doble, capacidad 2 personas
- **Habitación doble (camas simples)** — dos camas individuales, capacidad 2-3 personas **[CONFIRMAR: nombres/capacidad exactos de cada tipo, y si hay fotos separadas por tipo]**

Equipamiento en todas las habitaciones: TV LCD 32" Sony, TV por cable, frigobar, aire acondicionado frío/calor, calefacción por radiadores, secador de pelo, caja de seguridad, sommier de 26 cm La Cardeuse, ropa blanca y servicio de mucama.

### 6.4. Servicios y amenities

Agrupar en la grilla, por ejemplo, así (Claude Code puede ajustar el agrupamiento visual):

**Bienestar y pileta**
- Piscina cubierta-descubierta climatizada todo el año (agua a 28-30°, estructura tubular telescópica corrediza)
- Deck con reposeras alrededor de la pileta
- Jacuzzi independiente
- Sauna seco (por turnos, sin cargo)
- Ducha escocesa / gabinete de ducha (por turnos, sin cargo)
- Gimnasio
- Servicio de masajes (con costo adicional)

**Desayuno y confort**
- Desayuno buffet: panificados, fiambres, tartas, frutas, yogur, cereales, infusiones, untables, mermeladas, chocolatada y jugo de naranja
- Salón desayunador con vista al mar
- Juegos de mesa para niños y adultos
- Reposeras y sombrillas de playa

**Practicidad**
- WiFi en todo el complejo
- Ascensor
- Grupo electrógeno
- Estacionamiento gratuito (cocheras individuales descubiertas, con cámaras de seguridad)
- Cámaras de seguridad en accesos
- Caja de seguridad

**Políticas**
- Hostería libre de humo
- No se aceptan mascotas

### 6.5. Contacto y links externos

- **WhatsApp:** +54 9 2255 41-0868 → link `https://wa.me/5492255410868`
- **Teléfono fijo:** (02255) 45-8801 **[CONFIRMAR: ¿sigue vigente? viene del sitio actual]**
- **Email:** info@hosteriachaltu.com.ar **[CONFIRMAR: ¿sigue vigente?]**
- **Dirección:** Calle 308 e/ Alamedas 201 y 205, Villa Gesell Norte, Buenos Aires, Argentina
- **Booking.com:** https://www.booking.com/hotel/ar/hosteria-chaltu-villa-gesell.en-gb.html?aid=311984&label=hosteria-chaltu-villa-gesell-7urYp_ws%2ALY8_usvWRbpTQS169288097658%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atiaud-2395231936738%3Akwd-45100528476%3Alp9263024%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YboIMJYQAPicrzwdxpGM5o8&sid=b98f401ce964e36b24331585a9a8f83a&dest_id=-1018965&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1788467954&srpvid=231391356bf409d4&type=total&ucfs=1& (mantener el link completo tal cual: tiene el `aid` de afiliado de Joaquin)
- **TripAdvisor:** https://www.tripadvisor.com.ar/Hotel_Review-g312764-d3907269-Reviews-Hosteria_Chaltu-Villa_Gesell_Province_of_Buenos_Aires_Central_Argentina.html
- **Instagram:** @hosteriachaltu **[CONFIRMAR: handle real — aparece en el manual de marca pero no encontré el link directo]**
- **Facebook:** https://www.facebook.com/HosteriaChaltuNorte/ **[CONFIRMAR: ¿siguen usando esta página o la de Instagram nueva la reemplaza?]**

### 6.6. Ubicación

Dirección: Calle 308 e/ Alamedas 201 y 205, Villa Gesell Norte, Buenos Aires, Argentina. A 120 metros del mar, sobre una zona de bosque, a 10 cuadras del centro comercial de Villa Gesell.

Para el mapa embebido, usar un iframe de Google Maps por **búsqueda de dirección** (no por coordenadas sueltas, para evitar errores):
```
https://www.google.com/maps?q=Calle+308+e/+Alamedas+201+y+205,+Villa+Gesell,+Buenos+Aires,+Argentina&output=embed
```

## 7. Assets

- `referencias/manual-visual-chaltu.png` — manual de marca completo (ya incluido en esta carpeta)
- `assets/imagenes/` — acá van las fotos propias del hotel que Joaquin va a subir (habitaciones, pileta, desayuno, exteriores, bosque/playa cercana). Mientras no estén, usar bloques de color de la paleta como placeholder, no fotos de stock genéricas — para mantener la identidad visual coherente.
- Logo: extraer/vectorizar del manual visual, o pedir el archivo del logo en alta resolución/SVG si Joaquin lo tiene aparte.

## 8. Requisitos técnicos

- **Responsive:** mobile-first, se prueba en 375px, 768px y 1440px de ancho como mínimo
- **Multi-idioma:** los tres idiomas conviven en el mismo HTML (bloques con `data-lang` o similar) y el selector solo cambia qué bloque se muestra, sin recargar ni redirigir a otra URL — así se mantiene todo en una sola página
- **Performance:** imágenes optimizadas y lazy-loading, sin librerías pesadas innecesarias
- **SEO/Social:** title, meta description, y Open Graph tags (imagen del hero + descripción de marca) para que el link se vea bien al compartirlo por WhatsApp
- **Accesibilidad:** contraste de texto legible sobre los fondos crema/marfil, textos alternativos en imágenes, navegación posible por teclado
- **El botón de WhatsApp y los links a Booking/TripAdvisor tienen que abrir en pestaña nueva** (`target="_blank"`)

## 9. Checklist de aceptación

- [ ] Las 9 secciones de la sección 4 están presentes y en ese orden
- [ ] El botón flotante de WhatsApp funciona y abre `wa.me` con el número correcto
- [ ] Los botones de Booking y TripAdvisor linkean a las URLs exactas de la sección 6.5
- [ ] Selector de idioma funcional entre ES/EN/PT sin recargar la página
- [ ] Paleta de colores y tipografías coinciden con la sección 5
- [ ] Se ve bien en mobile (375px) y desktop
- [ ] No hay ninguna referencia a reservas online / pago / disponibilidad dentro del sitio (eso vive en Booking, no acá)
- [ ] Los puntos marcados **[CONFIRMAR]** fueron resueltos con Joaquin antes de dar el sitio por terminado
