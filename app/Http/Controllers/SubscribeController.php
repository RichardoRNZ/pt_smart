<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscribeController extends Controller
{
    //
    public function getSubscriptionbyCustomer($id)
    {
        $customer = Customer::findOrFail($id);

        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $allSubscriptions = $customer->subcriptions()
            ->where('is_approved', true)
            ->get();

        $allSubscriptions->transform(function ($order, $key) {
            return [
                'no' => $key + 1,
                'serviceName' => optional($order->product)->name,

            ];
        });
        return response()->json($allSubscriptions);

    }

    public function getInActiveSubscription()
    {
        $allSubcription = Subscription::where('is_approved', false)->with('customer', 'product')->get();

        $allSubcription->transform(function ($order, $key) {
            return [
                'no' => $key + 1,
                'id' => $order->id,
                'customerName' => optional($order->customer)->name,
                'serviceName' => optional($order->product)->name,
                'customer_id' => optional($order->customer)->id,
                'product_id' => optional($order->product)->id
            ];
        });
        return response()->json($allSubcription);

    }
    public function createNewSubscription(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'product_id' => 'required',


        ]);
        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $subscription = [
            'customer_id' => $request->customer_id,
            'product_id' => $request->product_id,
            'is_approved' => 'false'
        ];
        Subscription::create($subscription);
        return response()->json(['message' => 'Successfully add project', 'product' => $subscription], 200);

    }
    public function approveSubscription(Request $request)
    {
        // Pastikan bahwa id yang diterima adalah array
        $subscriptionIds = $request->input('id');


        // Cek apakah pengguna yang sedang login adalah manager
        if (auth()->user()->roles === "manager") {
            // Dapatkan semua subscription yang sesuai
            $subscriptions = Subscription::whereIn('id', $subscriptionIds)->get();

            if ($subscriptions->isEmpty()) {
                return response()->json(['message' => 'No subscriptions found to approve'], 404);
            }

            foreach ($subscriptions as $subscription) {
                // Update status subscription
                $subscription->is_approved = true;
                $subscription->save();

                // Update status customer terkait jika diperlukan
                $customer = $subscription->customer;
                if ($customer) {
                    $customer->is_subscribed = true; // Ganti dengan logika atau status yang sesuai
                    $customer->save();
                }
            }

            return response()->json(['message' => 'Successfully approved projects'], 200);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
    public function updateSubscription(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'product_id' => 'required',


        ]);
        if ($validator->fails()) {
            $message = implode(" ", $validator->errors()->all());
            return response()->json($message, 400);
        }
        $subscription = [
            'customer_id' => $request->customer_id,
            'product_id' => $request->product_id,
        ];
        $updatedSubscription = Subscription::findOrFail($request->id);
        $updatedSubscription->update($subscription);
        return response()->json(['message' => 'Successfully update project', 'product' => $updatedSubscription], 200);
    }
    public function deleteSubscription($id)
    {
        $subscription = Subscription::find($id);
        if ($subscription) {
            $subscription->delete();
            return response()->json(['message' => 'Successfully delete product'], 200);
        } else {
            return response()->json("Subscription not found", 404);
        }
    }
}
