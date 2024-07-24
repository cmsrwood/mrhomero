import React from 'react'
import CustomChart from '../../graficas/CustomChart'
export default function Dashboard() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ventas',
        data: [65, 59, 80, 81, 56, 55]
      },
      {
        label: 'Gastos',
        data: [28, 48, 40, 19, 86, 27]
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className='container pt-3'>
      <div className="row g-4">
        <div className="text-center justify-content-center">
          <CustomChart data={data} tipo='line' options={options} />
        </div>
        <div className="col-12 col-sm border border-2 mx-5 border-secondary  text-center">
          <h3 className='pt-4'>Prductos vendidos</h3>
          <p className='pt-2'>1234 unidades</p>
          <h4 className='pb-4 text-success'>+ 8% este mes</h4>
        </div>
        <div className="col-12 col-sm border mx-5 border-2 border-secondary text-center">
          <h3 className='pt-4'>Total ganancias</h3>
          <h4 className='pt-2'>COP 10.000.000</h4>
          <h4 className='pb-4 text-danger'>-5 % este mes</h4>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti fuga unde voluptatem, sunt accusantium praesentium aperiam voluptas natus numquam ipsum blanditiis delectus dolor nihil id mollitia laboriosam cum doloribus vero? Perferendis impedit sint cum animi dicta consectetur? Tenetur recusandae accusantium quo fugiat nulla nam sequi odit suscipit nobis minus quis, sed iure consequuntur maxime rem pariatur laudantium voluptatum tempora cum asperiores quod ducimus beatae assumenda repellendus! Itaque tempore optio porro ipsam aspernatur voluptates illo dolores libero amet voluptatibus accusamus, ullam quas repellendus ut, exercitationem nam vero sint earum dolorum quae quasi ea! Quaerat voluptatem minima nam voluptatum nihil magnam enim, et modi dolore velit a, natus sint, quasi animi dolor ipsam eos aliquid dolores alias cum ipsa delectus perferendis. Voluptates aspernatur dolorum molestias aliquid placeat repudiandae laboriosam soluta autem. Alias, harum ipsum expedita repellat ab, accusamus, natus debitis officia quod voluptates minus! Perspiciatis quis quo vitae ipsa aliquid quod sint soluta, natus dolorem dolore asperiores in expedita, fugit ab recusandae enim illo aperiam accusantium voluptates magni reiciendis saepe sapiente voluptas. Totam ducimus iste quaerat enim, accusamus voluptates quo debitis aliquid deserunt ipsam iusto? Ratione nam eum rerum magnam? Officiis ducimus quaerat voluptate. Earum quisquam adipisci voluptas cumque facere ea cupiditate, perferendis, rerum nostrum commodi officiis! Quam asperiores doloribus beatae aut omnis dignissimos quis nihil consequuntur sit. Est perspiciatis ducimus natus earum incidunt alias esse molestias nulla provident ipsam tempora corrupti delectus illo non tempore minima impedit nesciunt eos odio, voluptate, in labore quidem magni. Esse molestiae libero delectus, recusandae quis architecto sit laborum ea impedit voluptatibus reiciendis? Perspiciatis temporibus blanditiis ratione necessitatibus maxime sint, nostrum nulla nesciunt. Iure cum maxime dicta. Nobis libero veniam ipsa. Obcaecati aspernatur architecto provident officia! Nulla, consequuntur vel ducimus nam quod ea esse quam eaque asperiores quidem impedit laborum veniam, laboriosam maiores at distinctio itaque exercitationem ratione odit cupiditate a! Sunt quod temporibus alias ratione ipsa dolor consequuntur minima enim amet, impedit earum, maxime, at perferendis odit dicta perspiciatis dolorum modi culpa! Vel obcaecati delectus corrupti? Quia animi sunt, tenetur libero rem unde, voluptas adipisci odio quod, blanditiis quam ea non eligendi? Nisi magnam inventore laboriosam! Provident repellat rerum veniam voluptas. Sit incidunt dolores fugiat accusantium nam tempora repudiandae facilis est, exercitationem beatae vel modi itaque corrupti commodi impedit quibusdam praesentium nisi similique amet magni deleniti dolorem autem odit aliquid. Laudantium omnis quae sed ad ducimus amet iste saepe beatae accusamus aut, quam ab quos cupiditate perferendis quaerat tempora? Commodi sequi repellat nulla a, quos quidem ex alias reprehenderit architecto totam praesentium deserunt itaque, odio rem nisi! Quae repellat asperiores, sed aliquam vel nostrum vero recusandae nihil laborum ullam blanditiis reprehenderit, ut soluta? Eaque, dolore itaque voluptatem beatae enim, dolores cum nemo doloremque voluptatibus repellat distinctio recusandae at. Eius sapiente voluptate aliquid ut, est quos cum similique ad, dolorem, aspernatur libero ullam quo ex minima nostrum facere expedita. Fuga nemo amet ex? Molestiae itaque minima vero molestias recusandae sequi eaque deserunt pariatur nemo commodi reprehenderit in assumenda, corrupti error modi a aliquid odio vel atque? Nihil cum minima facere deleniti perferendis, consequatur vel, rerum ipsum iure laboriosam ratione rem nam quo? Consectetur quas quia maiores eum tempore magnam cum voluptate commodi rerum fugit minus asperiores autem delectus quos nisi ipsam minima laborum dolore atque soluta, alias at! Perspiciatis tempora quasi laboriosam, ipsam quaerat eius inventore delectus at assumenda nesciunt adipisci totam officia. Voluptates deleniti facere ipsam cumque reprehenderit eius, sapiente nostrum eaque fugiat minus hic reiciendis, totam optio animi obcaecati illum est recusandae dolore quo nesciunt vel! Dignissimos error culpa ratione repellat tempora, possimus dolores exercitationem quod sequi harum voluptates itaque tenetur soluta architecto optio accusantium, enim nostrum dicta nemo quibusdam suscipit? Inventore, vel neque impedit commodi dolorum eos praesentium eum soluta fugiat iure, quaerat quam ea perspiciatis velit alias! Ab dicta est illum odio corrupti dolores veniam. Ipsam saepe fugiat eius iure temporibus quae est error voluptatum, quas minus libero debitis nihil eveniet delectus esse facilis dolor in exercitationem ab quasi magnam? Facere sint eveniet, blanditiis repellendus vel voluptate doloribus molestiae ipsum deserunt in ad labore ut vero aspernatur soluta quam illum architecto magni possimus mollitia ipsam, laboriosam quo corporis cupiditate! Sapiente quisquam ad ut labore voluptate repellat accusamus numquam ullam soluta temporibus asperiores, voluptatem mollitia fuga dolorum laudantium facere officia, est iure ea ipsa commodi! Labore, eum minus. Aliquid, quae. Quibusdam dicta itaque pariatur, error, et nemo dolores neque vero iste dignissimos quos excepturi adipisci tenetur nam ex quam fugit culpa accusamus doloremque reprehenderit debitis ea, est quo. Unde facere recusandae cupiditate, atque repellat eligendi, commodi odit qui error a, veritatis ipsam. Suscipit delectus sint magnam velit culpa facere quidem aut obcaecati aperiam! Quos sint id atque quibusdam. Nihil, unde porro. Officia, minus! Quo nesciunt nihil ea atque maxime aperiam ut! Maiores in perspiciatis ipsa sunt porro cumque, omnis, sed possimus molestiae adipisci corrupti minus! Tempore nisi aspernatur animi. Atque, error! Ullam voluptas nisi neque, deserunt tenetur repellat ut perspiciatis cumque! Quaerat doloribus tempora sequi excepturi eligendi molestiae reiciendis culpa cumque numquam iusto tempore quibusdam dolorum distinctio, iure optio officia doloremque ab aliquam fuga harum deleniti mollitia. Itaque temporibus doloremque sapiente veniam hic iusto atque aliquid blanditiis, rem magnam, numquam et ad adipisci vitae repellendus! Nobis nesciunt, tenetur quasi hic error molestiae, odit tempore quisquam mollitia dignissimos laudantium voluptatibus reiciendis animi quas veritatis iusto atque! Voluptate placeat, optio accusantium nesciunt vitae, minima incidunt animi sed nobis nemo nostrum! Error recusandae incidunt obcaecati perferendis quam ex odio temporibus possimus tempore impedit reiciendis veniam, similique delectus maiores eaque eos quidem porro, aut tempora. Minus accusantium labore tempora consectetur ut, natus consequuntur, praesentium repellendus itaque ratione, voluptates eos iusto enim! Velit, enim odit! Deserunt modi optio illum delectus voluptas nostrum, quis maxime? Fugiat esse facere similique rerum error qui dolorem doloremque consequatur officiis, expedita, quia illo ut delectus cum impedit eligendi quasi dolore excepturi et non magni sint! Voluptatum totam aperiam alias. Commodi rem eligendi nisi soluta consequatur deserunt voluptas nobis quia, ea praesentium adipisci quis saepe magni aspernatur sit excepturi rerum et odio, animi dolores?</p>
    </div>
  )
}
