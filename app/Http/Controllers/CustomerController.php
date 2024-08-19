<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    //
    public function getAllCustomerLead(){

        $customers = Customer::where('is_subscribed','=','false')->get();


        return response()->json($customers);
    }
    public function getAllMemberships(){
        $customers = Customer::where('is_subscribed','=','true')->get();


        return response()->json($customers);
    }
    public function getAllCustomer(){
        $customers = Customer::all();
        return response()->json($customers);
    }
    public function addCustomer(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required',

        ]);

        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $customers = [
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'is_subscribed' => 'false',

        ];
        Customer::create($customers);
        return response()->json(['message' => 'Successfully add customer', 'customer' => $customers], 200);
    }
    public function updateCustomer(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'required',

        ]);

        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $existingCustomer = Customer::findOrFail($request->id);
        $customers = [
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'is_subscribed' => 'false',

        ];
        $existingCustomer->update($customers);
        return response()->json(['message' => 'Successfully update customer', 'customer' => $customers], 200);
    }
    public function deleteCustomerById($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => "Successfully delete customer"]);
    }
}
