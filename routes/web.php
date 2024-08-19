<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscribeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/token', function () {
    return csrf_token();
});
Route::get('/login', [AuthController::class,'loginPage'])->name('login-page');
Route::get('/customers', function () {
    return Inertia::render('Home');
})->name("customers");
Route::get('/products', function () {
    return Inertia::render('Home');
})->name("services");
Route::get('/projects', function () {
    return Inertia::render('Home');
})->name("projects");
Route::get('/memberships', function () {
    return Inertia::render('Home');
})->name("memberships");

Route::post('/login',[AuthController::class,'login']);
Route::get('customer/lead/data', [CustomerController::class,'getAllCustomerLead']);
Route::get('customer/memberships/data', [CustomerController::class,'getAllMemberships']);
Route::get('customer/all/data', [CustomerController::class,'getAllCustomer']);
Route::post('add_customer',[CustomerController::class,'addCustomer']);
Route::put('update_customer',[CustomerController::class,'updateCustomer']);
Route::delete('delete_customer/{id}',[CustomerController::class,'deleteCustomerById']);

Route::get('product/data', [ProductController::class,'getAllProducts']);
Route::post('add_product',[ProductController::class,'createProduct']);
Route::put('update_product',[ProductController::class,'updateProduct']);
Route::delete('delete_product/{id}',[ProductController::class,'deleteProduct']);


Route::get('subscribtion/inactive', [SubscribeController::class,'getInActiveSubscription']);
Route::get('subscribtion/active/{id}', [SubscribeController::class,'getSubscriptionbyCustomer']);
Route::post('add_subscription',[SubscribeController::class,'createNewSubscription']);
Route::put('update_subscription',[SubscribeController::class,'updateSubscription']);
Route::put('approve_subscription',[SubscribeController::class,'approveSubscription']);
Route::delete('delete_subscription/{id}',[SubscribeController::class,'deleteSubscription']);

