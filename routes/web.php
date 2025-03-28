<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AddressDefaultController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', [IndexController::class, 'index']);

Route::resource('book', BookController::class)->only(['index', 'show']);

Route::resource('cart', CartController::class)->only(['index', 'store', 'update', 'destroy']);

Route::get('/payment-return', [PaymentController::class, 'index'])->name('payment.index');
Route::post('/payment-callback', [PaymentController::class, 'update'])->name('payment.update');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('address', AddressController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::name('address.default')->put('address/{address}/default', AddressDefaultController::class);

    Route::resource('checkout', CheckoutController::class)->only(['index']);

    Route::resource('order', OrderController::class)->only(['index', 'store', 'show', 'update']);
});

require __DIR__ . '/auth.php';
