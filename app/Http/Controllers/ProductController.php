<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //
    public function getAllProducts(){
        $products = Product::all();
        return response()->json($products);
    }
    public function createProduct(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',

        ]);

        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $product = [
            'name' => $request->name
        ];
        Product::create($product);
        return response()->json(['message' => 'Successfully add product', 'product' => $product], 200);
    }
    public function updateProduct(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',

        ]);

        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $product = [
            'name' => $request->name
        ];
        Product::where('id', $request->id)->update($product);
        return response()->json(['message' => 'Successfully update product', 'product' => $product], 200);
    }
    public function deleteProduct($id){
        Product::destroy($id);
        return response()->json(['message' => 'Successfully deleted product'], 200);
    }

}
