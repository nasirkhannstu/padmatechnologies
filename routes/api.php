<?php

use Illuminate\Http\Request;

Route::post('login', 'ApiController@login');
Route::group(['middleware' => 'auth:api'], function(){

    Route::middleware(['admin'])->group(function(){
        Route::resource('/customer', 'CustomerController', ['except' => ['edit', 'show']]);
    });

    Route::resource('/bill', 'BillController', ['except' => ['edit', 'show']]);
});