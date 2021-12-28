function GarmentsHolder(props) {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {props.data?.map((product, index) => (
          <div key={index + props.startIndex} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.image_urls[0] || ""}
                alt={product.product_title || "No title"}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a target="_blank" href={product.url || ""} rel="noreferrer">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.product_title || "No title"}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.product_description || "No description"}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.currency_code || ""}{product.price || "TBD"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GarmentsHolder;